import { useEffect } from "react"


export default function (
    callback: () => void | Promise<void>,
    dependencies: ReadonlyArray<any>,
    interval: number,
    executeImmediately = true,
) {
    return useEffect(() => {
        if (executeImmediately) {
            setTimeout(async () => {
                await callback()
            }, 0)
        }

        const id = setInterval(async () => {
            await callback()
        }, interval)

        return () => clearInterval(id)
    }, [...dependencies])
}