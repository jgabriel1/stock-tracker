import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import { Cache } from 'react-native-cache'
import { addSeconds, isAfter } from 'date-fns'

interface CacheContextData {
  caches: Map<string, Cache>
}

interface StoredValue<V> {
  data: V
  expiresAt: Date
}

interface CacheOptions {
  ttlInSeconds: number
}

const CacheContext = createContext<CacheContextData>({} as CacheContextData)

export const CacheProvider: React.FC = ({ children }) => {
  const caches = useRef(new Map<string, Cache>())

  return (
    <CacheContext.Provider
      value={{
        caches: caches.current,
      }}
    >
      {children}
    </CacheContext.Provider>
  )
}

function useCache(namespace: string) {
  const { caches } = useContext(CacheContext)

  if (!caches.has(namespace)) {
    caches.set(
      namespace,
      new Cache({
        namespace,
        backend: AsyncStorage,
        policy: {
          maxEntries: 10,
          stdTTL: 30,
        } as { maxEntries: number },
      }),
    )
  }

  const cache = caches.get(namespace) as Cache

  return cache
}

export function useCachedItem<T>(
  namespace: string,
  buildKey: (...keyDependencies: React.DependencyList) => string,
  keyDependencies: React.DependencyList = [],
  { ttlInSeconds }: CacheOptions = { ttlInSeconds: 15 },
): [T | null | undefined, (data: T) => Promise<void>] {
  const cache = useCache(namespace)

  const [key, setKey] = useState('')
  const [value, setValue] = useState<T | null>()

  const loadData = useCallback(async () => {
    const storedValue = await cache.get(key)

    if (!storedValue) {
      setValue(null)

      return
    }

    const { data, expiresAt } = JSON.parse(storedValue) as StoredValue<T>

    const isExpired = isAfter(Date.now(), new Date(expiresAt))
    if (isExpired) {
      await cache.remove(key)

      setValue(null)

      return
    }

    setValue(data)
  }, [cache, key])

  const storeData = useCallback(
    async (data: T) => {
      const expiresAt = addSeconds(Date.now(), ttlInSeconds)

      const stringifiedValue = JSON.stringify({
        data,
        expiresAt,
      })

      await cache.set(key, stringifiedValue)

      setValue(data)
    },
    [cache, key, ttlInSeconds],
  )

  useEffect(() => {
    setKey(() => buildKey(...keyDependencies))
  }, [buildKey, keyDependencies, loadData])

  useEffect(() => {
    loadData()
  }, [loadData])

  return [value, storeData]
}
