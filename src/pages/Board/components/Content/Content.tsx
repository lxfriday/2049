import React, { useEffect, useRef } from 'react'
import classnames from 'classnames'
import { useSelector } from 'react-redux'
import { ECursorType, updateCanvasScale } from '@models/board'
import { safeAdd, safeMinus, safeDivide } from '@utils/index'
import type { RootState } from '@models/index'
import type { canvasHandleRefType } from '../../Board'
import styles from './Content.module.less'

let isDraggingCanvas = false
// 按下左键时鼠标的位置，按下就会记录
let dragSrcPos = { x: 0, y: 0 }
// 画布的默认缩放比例，能完全查看的比例
const defaultCanvasScale = 0.2
// 画布的缩放比例
let canvasScale = 1
// 移动比例
let prevCanvasTranslate = { x: 0, y: 0 }
let canvasTranslate = { x: 0, y: 0 }

// 画布宽高
const canvasW = 1920 * 5
const canvasH = 1080 * 5
const canvasScrollStep = 20 // 上下滑动step 20px
const canvasScaleStep = 0.05 // 缩放step 3%

interface IContentProps {
  canvasHandleRef: canvasHandleRefType
}

export default function Content({ canvasHandleRef }: IContentProps) {
  const { cursorType } = useSelector((rootState: RootState) => rootState.board)
  // 画布ref
  const canvasRef = useRef<HTMLDivElement>(null)
  // 能否拖动画布
  const canDragCanvas = cursorType === ECursorType.palm

  // 单击 pointer palm 自动切换
  // function handleContextButtonSwitchCursorType(
  //   e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  // ) {
  //   e.preventDefault()
  //   if (cursorType === ECursorType.pointer) {
  //     updateCursorType(ECursorType.palm)
  //     if (canvasRef.current) canvasRef.current.style.cursor = `pointer`
  //   } else {
  //     updateCursorType(ECursorType.pointer)
  //     if (canvasRef.current) canvasRef.current.style.cursor = `default`
  //   }
  // }

  // const cursorClassName = useMemo(() => {
  //   switch (cursorType) {
  //     case ECursorType.xiexiangfa5: {
  //       return styles.cursorxiexiangfa5
  //     }
  //     case ECursorType.xiexiangfa4: {
  //       return styles.cursorxiexiangfa4
  //     }
  //     case ECursorType.xiexiangfa3: {
  //       return styles.cursorxiexiangfa3
  //     }
  //     case ECursorType.xiexiangfa2: {
  //       return styles.cursorxiexiangfa2
  //     }
  //     case ECursorType.xiexiangfa1: {
  //       return styles.cursorxiexiangfa1
  //     }
  //     case ECursorType.palm: {
  //       return styles.cursorPointer
  //     }
  //     case ECursorType.pointer:
  //     default: {
  //       return styles.cursorDefault
  //     }
  //   }
  // }, [cursorType])

  function handleCanvasMouseDown(
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) {
    if (canDragCanvas || e.buttons === 2) {
      isDraggingCanvas = true
      dragSrcPos = {
        x: e.clientX,
        y: e.clientY,
      }
      prevCanvasTranslate = { ...canvasTranslate }
    }
  }

  function handleCanvasMouseMove(
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) {
    if (isDraggingCanvas) {
      // ----------------------------------
      // matrix(a, b, c, d, tx, ty)
      // a：水平缩放幅度
      // b：x轴倾斜度
      // c：y轴倾斜度
      // d：垂直缩放幅度
      // tx：水平移动距离
      // ty：垂直移动距离
      canvasRef.current!.style.cursor = 'grab'
      const moveX = e.clientX - dragSrcPos.x
      const moveY = e.clientY - dragSrcPos.y
      canvasTranslate = {
        x: prevCanvasTranslate.x + moveX,
        y: prevCanvasTranslate.y + moveY,
      }
      canvasRef.current!.style.transform = `matrix(${canvasScale}, 0, 0, ${canvasScale}, ${canvasTranslate.x}, ${canvasTranslate.y})`
    } else {
      if (canvasHandleRef.current)
        canvasHandleRef.current.updateCursor(cursorType)
    }
  }

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.code === 'Equal' || e.code === 'NumpadAdd') && e.ctrlKey) {
        // 放大操作
        e.preventDefault()
        canvasHandleRef.current!.scaleUp()
      } else if (
        (e.code === 'Minus' || e.code === 'NumpadSubtract') &&
        e.ctrlKey
      ) {
        // 缩小操作
        e.preventDefault()
        canvasHandleRef.current!.scaleDown()
      } else if ((e.code === 'Digit0' || e.code === 'Numpad0') && e.ctrlKey) {
        // 重置操作
        e.preventDefault()
        canvasHandleRef.current!.resetScale()
        console.log('重置缩放比例', e)
      }
    }
    function onMouseUp(e: MouseEvent) {
      if (isDraggingCanvas) canvasRef.current!.style.cursor = 'pointer'
      else canvasRef.current!.style.cursor = 'default'
      isDraggingCanvas = false
    }

    function onCanvasWheel(e: WheelEvent) {
      e.preventDefault() // 禁用默认的放大缩小，改由自定义
      const { left: canvasLeft, top: canvasTop } =
        canvasRef.current!.getBoundingClientRect()
      // 鼠标相对于视口的位置
      const cursorPos = {
        left: e.clientX,
        top: e.clientY,
      }
      // 鼠标相对于cavas的位置
      const cursorCanvasRelativePos = {
        left: Math.round(-safeDivide(safeMinus(canvasLeft, cursorPos.left), canvasScale)),
        top: Math.round(-safeDivide(safeMinus(canvasTop, cursorPos.top), canvasScale)),
      }
      console.log('相对位置', cursorCanvasRelativePos, {
        ofX: e.offsetX,
        ofY: e.offsetY,
      })
      // 滚轮放大缩小
      // 按下 ctrl 同时滚动，则缩放
      if (e.ctrlKey) {
        canvasRef.current!.style.transformOrigin = `${cursorCanvasRelativePos.left}px ${cursorCanvasRelativePos.top}px`
        // 缩放比例step为 5%
        if (e.deltaY < 0) {
          canvasHandleRef.current?.scaleUp()
        } else if (e.deltaY > 0) {
          canvasHandleRef.current?.scaleDown()
        }
      } else {
        // 没有按下ctrl，滚动，上下移动
        const top = parseFloat(
          getComputedStyle(canvasRef.current as HTMLDivElement).top,
        )
        if (e.deltaY < 0) {
          // 移动step为50px
          canvasRef.current!.style.top = `${safeMinus(top, canvasScrollStep)}px`
        } else if (e.deltaY > 0) {
          canvasRef.current!.style.top = `${safeAdd(top, canvasScrollStep)}px`
        }
      }
      return
    }

    function onDocumentWheel(e: WheelEvent) {
      e.preventDefault()
    }

    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('mouseup', onMouseUp)
    canvasRef.current!.addEventListener('wheel', onCanvasWheel, {
      passive: false,
    })
    document.addEventListener('wheel', onDocumentWheel, { passive: false })
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('mouseup', onMouseUp)
      canvasRef.current!.removeEventListener('wheel', onCanvasWheel)
      document.removeEventListener('wheel', onDocumentWheel)
    }
  }, [canvasHandleRef])
  useEffect(() => {
    canvasHandleRef.current = {
      updateCursor(t: ECursorType) {
        switch (t) {
          case ECursorType.xiexiangfa5: {
            canvasRef.current!.style.cursor = `url(/controls-xiexiangfa-opt5.svg), default`
            return
          }
          case ECursorType.xiexiangfa4: {
            canvasRef.current!.style.cursor = `url(/controls-xiexiangfa-opt4.svg), default`
            return
          }
          case ECursorType.xiexiangfa3: {
            canvasRef.current!.style.cursor = `url(/controls-xiexiangfa-opt3.svg), default`
            return
          }
          case ECursorType.xiexiangfa2: {
            canvasRef.current!.style.cursor = `url(/controls-xiexiangfa-opt2.svg), default`
            return
          }
          case ECursorType.xiexiangfa1: {
            canvasRef.current!.style.cursor = `url(/controls-xiexiangfa-opt1.svg), default`
            return
          }
          case ECursorType.palm: {
            canvasRef.current!.style.cursor = `pointer`
            return
          }
          case ECursorType.pointer:
          default: {
            canvasRef.current!.style.cursor = `default`
            return
          }
        }
      },
      resetScale() {
        canvasRef.current!.style.transformOrigin = `50% 50%`
        canvasRef.current!.style.transform = `matrix(${defaultCanvasScale}, 0, 0, ${defaultCanvasScale}, 0, 0)`
        canvasScale = defaultCanvasScale
        canvasTranslate = { x: 0, y: 0 }
        updateCanvasScale(canvasScale)
      },
      scaleUp() {
        canvasScale = safeAdd(canvasScale, canvasScaleStep)
        canvasRef.current!.style.transform = `matrix(${canvasScale}, 0, 0, ${canvasScale}, ${canvasTranslate.x}, ${canvasTranslate.y})`
        updateCanvasScale(canvasScale)
      },
      scaleDown() {
        // 最低缩放比例 5%
        if (safeMinus(canvasScale, canvasScaleStep) > 0.2) {
          canvasScale = safeMinus(canvasScale, canvasScaleStep)
          canvasRef.current!.style.transform = `matrix(${canvasScale}, 0, 0, ${canvasScale}, ${canvasTranslate.x}, ${canvasTranslate.y})`
          updateCanvasScale(canvasScale)
        }
      },
    }
  }, [canvasHandleRef])
  return (
    <div
      className={classnames(styles.wrapper)}
      onContextMenu={(e) => {
        e.preventDefault()
      }}>
      {/* 画布 */}
      <div
        ref={canvasRef}
        className={styles.canvas}
        style={{
          width: canvasW,
          height: canvasH,
          left: `calc(50% - ${canvasW / 2}px)`,
          top: `calc(50% - ${canvasH / 2}px)`,
        }}
        onMouseDown={handleCanvasMouseDown}
        onMouseMove={handleCanvasMouseMove}>
        ssss
        <div className={styles.horizontalLine}></div>
        <div className={styles.verticalLine}></div>
      </div>
    </div>
  )
}
