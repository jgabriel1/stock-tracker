import { useEffect, useCallback } from "react"


export default function (
    callback: () => void,
    dependencies: ReadonlyArray<any>,
    interval: number,
    executeImmediately = true,
) {
    const memoized = useCallback(callback, [...dependencies])

    return useEffect(() => {
        if (executeImmediately) {
            memoized()
        }

        const id = setInterval(memoized, interval)

        return () => clearInterval(id)
    }, [memoized, interval, executeImmediately])
}