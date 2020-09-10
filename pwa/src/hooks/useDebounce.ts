import { useCallback, useState } from 'react'

type Callback = (...args: any[]) => void | Promise<void>

export default function useDebounce(
  callback: Callback,
  delay: number,
): Callback {
  const [id, setId] = useState(0)

  return useCallback(
    (...args: any[]) => {
      clearTimeout(id)

      const newId = setTimeout(async () => {
        await callback(...args)
      }, delay)

      setId(newId)
    },
    [callback, delay, id],
  )
}
