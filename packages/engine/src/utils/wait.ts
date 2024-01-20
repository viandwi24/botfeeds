export const runWithTimeout = async <T>(promise: Promise<T>, timeout: number) => {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error("timeout"))
    }, timeout)

    promise.then((res) => {
      clearTimeout(timer)
      resolve(res)
    }).catch((err) => {
      clearTimeout(timer)
      reject(err)
    })
  })
}

export const sleep = async (ms: number) => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve()
    }, ms)
  })
}