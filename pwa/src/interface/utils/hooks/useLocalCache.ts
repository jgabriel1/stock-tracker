import { useCallback, useEffect, useState } from 'react'
import { isAfter, addSeconds } from 'date-fns'
import { useAsyncStorage } from '@react-native-community/async-storage'

interface LocalCacheOptions {
  ttlInSeconds?: number
}

interface StoredValue<V> {
  data: V
  expiresAt: Date
}

export default function useLocalCache<T>(
  key: string,
  { ttlInSeconds }: LocalCacheOptions,
): {
  value?: T | null
  storeData(data: T): Promise<void>
} {
  const { getItem, setItem, removeItem } = useAsyncStorage(key)

  const [value, setValue] = useState<T | null>()

  const loadData = useCallback(async (): Promise<void> => {
    const storedValue = await getItem()

    if (!storedValue) {
      setValue(null)

      return
    }

    const { data, expiresAt } = JSON.parse(storedValue) as StoredValue<T>

    const isExpired = isAfter(Date.now(), expiresAt)
    if (isExpired) {
      await removeItem()

      setValue(null)

      return
    }

    setValue(data)
  }, [getItem, removeItem])

  const storeData = useCallback(
    async (data: T): Promise<void> => {
      const expiresAt = addSeconds(Date.now(), ttlInSeconds || 30)

      const stringifiedValue = JSON.stringify({
        data,
        expiresAt,
      })

      await setItem(stringifiedValue)
    },
    [setItem, ttlInSeconds],
  )

  useEffect(() => {
    if (value === undefined) {
      loadData()
    }
  }, [loadData, value])

  return {
    value,
    storeData,
  }
}
