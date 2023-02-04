export function debounce(func: Function, waiting: number = 100) {
  let timer: NodeJS.Timeout | null = null
  return function (this: any, ...args: any[]) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
      timer = null
    }, waiting)
  }
}
