import { BigNumber } from 'bignumber.js'

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

/**
 * 两数相加
 * @returns
 */
export function safeAdd(a: number, b: number) {
  return new BigNumber(a).plus(b).toNumber()
}
/**
 * 两数相减
 * @returns
 */
export function safeMinus(a: number, b: number) {
  return new BigNumber(a).minus(b).toNumber()
}
/**
 * 两数相乘
 * @returns
 */
export function safeMultiple(a: number, b: number) {
  return new BigNumber(a).multipliedBy(b).toNumber()
}
/**
 * 两数相除
 * @returns
 */
export function safeDivide(a: number, b: number) {
  return new BigNumber(a).dividedBy(b).toNumber()
}
