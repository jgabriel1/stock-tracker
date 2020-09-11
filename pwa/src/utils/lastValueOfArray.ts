export default function lastValueOfArray<T>(array: Array<T>): T {
  const [last] = array.slice(-1)
  return last
}
