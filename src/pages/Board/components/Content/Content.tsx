import React, { useEffect, useRef } from 'react'
import classnames from 'classnames'
import { useSelector } from 'react-redux'
import { plus, minus } from 'number-precision'
import { ECursorType, updateCursorType, updateCanvasScale } from '@models/board'
import type { RootState } from '@models/index'
import type { canvasHandleRefType } from '../../Board'
import styles from './Content.module.less'

let isDraggingCanvas = false
// 按下左键时鼠标的位置，按下就会记录
let dragSrcPos = { x: 0, y: 0 }
// 按下鼠标时，鼠标的位置，按下就会记录
let dragInitialCanvasPos = { x: 0, y: 0 }
// 画布的缩放比例
let canvasScale = 1

interface IContentProps {
  canvasHandleRef: canvasHandleRefType
}

export default function Content({ canvasHandleRef }: IContentProps) {
  const { cursorType } = useSelector((rootState: RootState) => rootState.board)
  // 画布ref
  const canvasRef = useRef<HTMLDivElement>(null)
  // 能否拖动画布
  const canDragCanvas = cursorType === ECursorType.palm

  // pointer palm 自动切换
  function handleWwitchCursorType(
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) {
    e.preventDefault()
    if (cursorType === ECursorType.pointer) {
      updateCursorType(ECursorType.palm)
      if (canvasRef.current) canvasRef.current.style.cursor = `pointer`
    } else {
      updateCursorType(ECursorType.pointer)
      if (canvasRef.current) canvasRef.current.style.cursor = `default`
    }
  }

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
    if (canDragCanvas) {
      isDraggingCanvas = true
      dragSrcPos = {
        x: e.clientX,
        y: e.clientY,
      }
      if (canvasRef.current) {
        canvasRef.current.style.cursor = 'grab'
        const { left, top } = getComputedStyle(canvasRef.current)
        dragInitialCanvasPos = {
          x: parseFloat(left),
          y: parseFloat(top),
        }
      }
    }
  }

  function handleCanvasMouseMove(
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) {
    if (canvasRef.current) {
      if (isDraggingCanvas) {
        const moveX = e.clientX - dragSrcPos.x
        const moveY = e.clientY - dragSrcPos.y
        const newPos = {
          x: dragInitialCanvasPos.x + moveX,
          y: dragInitialCanvasPos.y + moveY,
        }
        canvasRef.current.style.left = `${newPos.x}px`
        canvasRef.current.style.top = `${newPos.y}px`
      } else {
        canvasHandleRef.current &&
          canvasHandleRef.current.updateCursor(cursorType)
      }
    }
  }

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.code === 'Equal' || e.code === 'NumpadAdd') && e.ctrlKey) {
        // 放大操作
        e.preventDefault()
        if (canvasHandleRef.current) {
          canvasHandleRef.current.scaleUp()
        }
      } else if (
        (e.code === 'Minus' || e.code === 'NumpadSubtract') &&
        e.ctrlKey
      ) {
        // 缩小操作
        e.preventDefault()
        if (canvasHandleRef.current) {
          canvasHandleRef.current.scaleDown()
        }
      } else if ((e.code === 'Digit0' || e.code === 'Numpad0') && e.ctrlKey) {
        // 重置操作
        e.preventDefault()
        if (canvasHandleRef.current) {
          canvasHandleRef.current.resetScale()
        }
        console.log('重置缩放比例', e)
      }
    }
    function onMouseUp(e: MouseEvent) {
      console.log('onMouseUp')
      if (canvasRef.current) {
        if (isDraggingCanvas) canvasRef.current.style.cursor = 'pointer'
        else canvasRef.current.style.cursor = 'default'
      }
      isDraggingCanvas = false
    }

    function onWheel(e: WheelEvent) {
      e.preventDefault() // 禁用默认的放大缩小，改由自定义
      // 滚轮放大缩小
      console.log('onWheel', e)
      if (e.deltaY < 0 && e.ctrlKey) {
        console.log('上滑 放大')
        // 缩放比例step为 5%
        if (canvasHandleRef.current) {
          canvasHandleRef.current.scaleUp()
        }
      } else if (e.deltaY > 0 && e.ctrlKey) {
        console.log('下滑 缩小')
        if (canvasHandleRef.current) {
          canvasHandleRef.current.scaleDown()
        }
      }
    }

    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('mouseup', onMouseUp)
    document.addEventListener('wheel', onWheel, { passive: false })
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('mouseup', onMouseUp)
      document.removeEventListener('wheel', onWheel)
    }
  }, [canvasHandleRef])
  useEffect(() => {
    canvasHandleRef.current = {
      updateCursor(t: ECursorType) {
        if (canvasRef.current) {
          switch (t) {
            case ECursorType.xiexiangfa5: {
              canvasRef.current.style.cursor = `url(/controls-xiexiangfa-opt5.svg), default`
              return
            }
            case ECursorType.xiexiangfa4: {
              canvasRef.current.style.cursor = `url(/controls-xiexiangfa-opt4.svg), default`
              return
            }
            case ECursorType.xiexiangfa3: {
              canvasRef.current.style.cursor = `url(/controls-xiexiangfa-opt3.svg), default`
              return
            }
            case ECursorType.xiexiangfa2: {
              canvasRef.current.style.cursor = `url(/controls-xiexiangfa-opt2.svg), default`
              return
            }
            case ECursorType.xiexiangfa1: {
              canvasRef.current.style.cursor = `url(/controls-xiexiangfa-opt1.svg), default`
              return
            }
            case ECursorType.palm: {
              canvasRef.current.style.cursor = `pointer`
              return
            }
            case ECursorType.pointer:
            default: {
              canvasRef.current.style.cursor = `default`
              return
            }
          }
        }
      },
      resetScale() {
        if (canvasRef.current) {
          canvasRef.current.style.left = 'calc(50% - 2880px)'
          canvasRef.current.style.top = 'calc(50% - 1570px)'
          canvasRef.current.style.transform = 'scale(1)'
          canvasScale = 1
        }
      },
      scaleUp() {
        if (canvasRef.current) {
          canvasScale = plus(canvasScale, 0.05)
          canvasRef.current.style.transform = `scale(${canvasScale})`
          updateCanvasScale(canvasScale)
        }
      },
      scaleDown() {
        if (canvasRef.current && canvasScale > 0.05) {
          canvasScale = minus(canvasScale, 0.05)
          canvasRef.current.style.transform = `scale(${canvasScale})`
          updateCanvasScale(canvasScale)
        }
      },
    }
  }, [canvasHandleRef])
  return (
    <div
      className={classnames(styles.wrapper)}
      onContextMenu={handleWwitchCursorType}>
      {/* 画布 */}
      <div
        ref={canvasRef}
        className={styles.canvas}
        onMouseDown={handleCanvasMouseDown}
        onMouseMove={handleCanvasMouseMove}>
        Hello this is word
      </div>
    </div>
  )
}
