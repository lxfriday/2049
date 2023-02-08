interface IOptions {
  /**
   * 目标元素
   */
  target: HTMLElement
  /**
   * 是否把滚轮时间绑定在target上，`true` 绑定在target上，`false` 绑定在 `window` 上
   * - `true` 需要鼠标移动到target区域内才会缩放
   * - `false` 只要移动滚轮就会缩放
   */
  bindWheelEventOnTarget?: boolean
  /**
   * 禁止window缩放，默认 `true`
   */
  disableWindowScale?: boolean
  /**
   * 缩放时需不需要同时按下 ctrl，默认 true
   */
  isScaleNeedCtrl?: boolean
  /**
   * 缩放step，默认 0.1
   */
  scaleStep?: number
  /**
   * 最小缩放比例，默认 0.05 => 5%
   */
  minScale?: number
  /**
   * 变换的时候是否使用动画过度，缩放的时候效果可以，移动的时候效果较差，false | true | `transform 0.1s`
   * - `false` 默认，不使用动画
   * - `true` 使用 `transform 0.1s`
   * - `transform 0.2s` 自定义动画
   */
  transition?: boolean | string
  /**
   * 是否打印transform的状态信息 dev 时使用，默认 `false`
   */
  logTransformInfo?: boolean
  /**
   * 是否使用允许键盘来缩放目标，默认 `false`
   */
  enableKeyboardScale?: boolean
  /**
   * 拖拽时的鼠标样式，默认 `grab`
   */
  draggingCursorType?: string
  /**
   * 当transform状态发生变化时的监听函数
   */
  onTransformChange?(
    scale: number,
    translateX: number,
    translateY: number,
  ): void
}

function log(...arg: any[]) {
  console.log(...arg)
}

export default class FixedPointScaling {
  /**
   * 目标元素
   */
  private target: HTMLElement | null
  /**
   * 是否把滚轮时间绑定在target上，true 绑定在target上，false绑定在window上
   * @true 需要鼠标移动到target区域内才会缩放
   * @false 只要移动滚轮就会缩放
   */
  bindWheelEventOnTarget: boolean = true
  /**
   * 缩放时需不需要同时按下 ctrl
   */
  private isScaleNeedCtrl: boolean = true
  /**
   * 禁止window缩放
   */
  private disableWindowScale: boolean = true
  /**
   * 是否正在拖拽
   */
  private isDragging: boolean = false
  /**
   * 拖拽开始 按下鼠标时的 translate 值
   */
  private draggingSrcTranslate = { x: 0, y: 0 }
  /**
   * 当前的 translate
   */
  private translate = { x: 0, y: 0 }
  /**
   * 按下鼠标时鼠标相对浏览器窗口的位置
   */
  private cursorSrcPos = { x: 0, y: 0 } // left top
  /**
   * 缩放倍数
   */
  private scale: number = 1
  /**
   * 缩放step
   */
  private scaleStep: number = 0.1
  /**
   * 最小缩放比例
   */
  private minScale: number = 0.05
  /**
   * 是否使用动画过度
   */
  private transition: boolean | string = 'none'
  /**
   * 是否显示transform的状态信息 dev 时使用
   */
  private logTransformInfo: boolean = false
  /**
   * 是否使用允许键盘来缩放目标
   */
  private enableKeyboardScale: boolean = false
  /**
   * 未拖拽时的鼠标样式
   */
  private normalCursorType: string = 'default'
  /**
   * 拖拽时的鼠标样式
   */
  private draggingCursorType: string = 'grab'
  /**
   * 当transform状态发生变化时的监听函数
   */
  private onTransformChange:
    | ((scale: number, translateX: number, translateY: number) => void)
    | undefined = undefined
  /**
   * 鼠标在 target 内按下
   */
  private handleMouseDown?: (e: MouseEvent) => void
  /**
   * 滚轮滚动
   */
  private handleMouseMove?: (e: MouseEvent) => void
  /**
   * 鼠标按键松开
   */
  private handleWindowMouseUp?: (e: MouseEvent) => void
  /**
   * 滚轮在目标区域内滚动
   */
  private handleWheel?: (e: WheelEvent) => void
  /**
   * 在window窗口滚轮滚动
   */
  public handleWindowWheel?: (e: WheelEvent) => void
  /**
   * 普通放大，使用键盘或者滚轮不在target区域内部
   */
  public handleScaleUp?: () => void
  /**
   * 普通缩小，使用键盘或者滚轮不在target区域内部
   */
  private handleScaleDown?: () => void
  /**
   * 键盘事件
   */
  private handleKeyDown?: (e: KeyboardEvent) => void
  constructor(options: IOptions) {
    this.target = options.target
    this.bindWheelEventOnTarget = !!options.bindWheelEventOnTarget
    this.disableWindowScale = !!options.disableWindowScale
    this.isScaleNeedCtrl = !!options.isScaleNeedCtrl
    this.scaleStep = options.scaleStep || 0.1
    this.minScale = options.minScale || 0.05
    this.logTransformInfo = !!options.logTransformInfo
    this.onTransformChange = options.onTransformChange
    this.enableKeyboardScale = !!options.enableKeyboardScale
    if (options.draggingCursorType)
      this.draggingCursorType = options.draggingCursorType
    if (options.transition === false || options.transition === void 0)
      this.transition = 'none'
    else {
      if (typeof this.transition === 'string') {
        this.transition = options.transition
      } else {
        this.transition = 'transform 0.1s'
      }
    }
    this.init()
    this.run()
  }
  /**
   * 初始化一些信息
   */
  private init() {
    if (!(this.target instanceof HTMLElement)) {
      throw new Error('请绑定容器')
    }
    const target = this.target
    target.style.transformOrigin = '0 0' // origin 设置为左上角
    target.style.transition = this.transition as string
  }
  /**
   * 开始运行
   */
  private run() {
    this.applyListeners()
  }

  private checkCursorInTarget(e: WheelEvent): boolean {
    const { left, top, width, height } = this.target!.getBoundingClientRect()
    const cursorPos = {
      x: e.clientX,
      y: e.clientY,
    }
    if (
      cursorPos.x < left ||
      cursorPos.x > left + width ||
      cursorPos.y < top ||
      cursorPos.y > top + height
    )
      return false
    return true
  }
  /**
   * 绑定监听器
   */
  private applyListeners() {
    const target = this.target
    // window 发生滚动事件
    this.handleWindowWheel = (e: WheelEvent) => {
      e.preventDefault()
    }
    // target 发生鼠标按下事件
    this.handleMouseDown = (e: MouseEvent) => {
      const target = this.target
      this.normalCursorType = target!.style.cursor
      target!.style.cursor = this.draggingCursorType
      this.isDragging = true
      this.draggingSrcTranslate = { ...this.translate }
      this.cursorSrcPos = {
        x: e.clientX,
        y: e.clientY,
      }
    }
    // target 发生鼠标移动事件
    this.handleMouseMove = (e: MouseEvent) => {
      if (this.isDragging) {
        const cursorCurrentPos = {
          x: e.clientX,
          y: e.clientY,
        }
        // 负值往左，正值往右
        this.translate = {
          x:
            this.draggingSrcTranslate.x +
            cursorCurrentPos.x -
            this.cursorSrcPos.x,
          y:
            this.draggingSrcTranslate.y +
            cursorCurrentPos.y -
            this.cursorSrcPos.y,
        }
        this.applyTransform()
      }
    }
    // target 发生鼠标松开事件
    this.handleWindowMouseUp = (e: MouseEvent) => {
      this.isDragging = false
      target!.style.cursor = this.normalCursorType
    }
    // target 发生鼠标滚动事件
    this.handleWheel = (e: WheelEvent) => {
      if (this.isScaleNeedCtrl && !e.ctrlKey) return
      e.preventDefault()
      if (this.bindWheelEventOnTarget && !this.checkCursorInTarget(e)) {
        log('鼠标不在 target 区域内')
        if (e.deltaY < 0) this.handleScaleUp!()
        else this.handleScaleDown!()
        return
      }
      // 鼠标相对于浏览器窗口的位置
      const cursorPos = {
        x: e.clientX,
        y: e.clientY,
      }
      const boxEleRect = target!.getBoundingClientRect()
      // transform origin 在屏幕中位置
      const originPos = {
        x: boxEleRect.left,
        y: boxEleRect.top,
      }
      // 缩放前的相对位置
      const cursorRelativeBasePosBefore = {
        x: Math.round((cursorPos.x - originPos.x) / this.scale),
        y: Math.round((cursorPos.y - originPos.y) / this.scale),
      }
      // 带放大比例的位置
      const cursorRelativePosBefore = {
        x: cursorPos.x - originPos.x,
        y: cursorPos.y - originPos.y,
      }
      // 上滑，放大
      if (e.deltaY < 0) {
        this.scale = this.scale + this.scaleStep
        // 缩放后的相对位置
        const cursorRelativePosAfter = {
          x: cursorRelativeBasePosBefore.x * this.scale,
          y: cursorRelativeBasePosBefore.y * this.scale,
        }
        const deltaX = cursorRelativePosAfter.x - cursorRelativePosBefore.x
        const deltaY = cursorRelativePosAfter.y - cursorRelativePosBefore.y
        this.translate = {
          x: Math.round(this.translate.x - deltaX),
          y: Math.round(this.translate.y - deltaY),
        }
      } else {
        if (this.scale - this.scaleStep > this.minScale) {
          this.scale = this.scale - this.scaleStep
          // 缩放后的相对位置
          const cursorRelativePosAfter = {
            x: cursorRelativeBasePosBefore.x * this.scale,
            y: cursorRelativeBasePosBefore.y * this.scale,
          }
          const deltaX = cursorRelativePosBefore.x - cursorRelativePosAfter.x
          const deltaY = cursorRelativePosBefore.y - cursorRelativePosAfter.y
          this.translate = {
            x: Math.round(this.translate.x + deltaX),
            y: Math.round(this.translate.y + deltaY),
          }
        }
      }
      this.applyTransform()
    }
    this.handleScaleUp = () => {}
    // 键盘缩小
    this.handleScaleDown = () => {}
    this.handleKeyDown = (e: KeyboardEvent) => {}
    target!.addEventListener('mousedown', this.handleMouseDown)
    target!.addEventListener('mousemove', this.handleMouseMove)
    // 这里需要window级监听，防止鼠标移动到浏览器外松开
    window.addEventListener('mouseup', this.handleWindowMouseUp)
    window.addEventListener('keydown', this.handleKeyDown)
    if (this.bindWheelEventOnTarget) {
      target!.addEventListener('wheel', this.handleWheel, {
        passive: false,
      })
    } else {
      window.addEventListener('wheel', this.handleWheel, {
        passive: false,
      })
    }
    // 是否禁止全局缩放
    if (this.disableWindowScale) {
      window.addEventListener('wheel', this.handleWindowWheel, {
        passive: false,
      })
    }
  }
  /**
   * 移除事件监听器
   */
  public removeListeners() {
    const target = this.target
    target!.removeEventListener('mousedown', this.handleMouseDown!)
    target!.removeEventListener('mousemove', this.handleMouseMove!)
    window.removeEventListener('mouseup', this.handleWindowMouseUp!)
    window.removeEventListener('wheel', this.handleWindowWheel!)
    window.removeEventListener('keydown', this.handleKeyDown!)
    if (this.bindWheelEventOnTarget) {
      target!.removeEventListener('wheel', this.handleWheel!)
    } else {
      window!.removeEventListener('wheel', this.handleWheel!)
    }
    log('listeners removed')
  }
  /**
   * 应用transform属性
   */
  private applyTransform() {
    this.target!.style.transform = `matrix(${this.scale}, 0, 0, ${this.scale}, ${this.translate.x}, ${this.translate.y})`
    this.onTransformChange &&
      this.onTransformChange(
        parseFloat(this.scale.toFixed(2)),
        this.translate.x,
        this.translate.y,
      )
    if (this.logTransformInfo) {
      log(
        `translateX: ${this.translate.x}, translateY: ${this.translate.y}, scale: ${this.scale}`,
      )
    }
  }
}

// 外部控制放大
// 快捷键放大
