import { useCallback, useState } from 'react'

export default (callback: (...args: any[]) => void | Promise<void>, delay: number) => {
    const [id, setId] = useState(0)

    return useCallback((...args: any[]) => {
        clearTimeout(id)

        const newId = setTimeout(async () => {
            await callback(...args)
        }, delay)

        setId(newId)
    }, [callback])
}