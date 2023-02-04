import React, { useEffect, useRef } from 'react'
import classnames from 'classnames'
import { useSelector } from 'react-redux'
import { ECursorType, updateCursorType } from '@models/board'
import { debounce } from '@utils/index'
import type { RootState } from '@models/index'
import styles from './Content.module.less'

let isDraggingCanvas = false
let dragSrcPos = { x: 0, y: 0 }
let dragInitialCanvasPos = { x: 0, y: 0 }

interface IContentProps {
  canvasHandleRef: React.MutableRefObject<{
    updateCursor(t: ECursorType): void
  } | null>
}

export default function Content({ canvasHandleRef }: IContentProps) {
  const { cursorType } = useSelector((rootState: RootState) => rootState.board)
  const { current: debouncedDragCanvas } = useRef(debounce(handleDragCanvas, 0))
  const canvasRef = useRef<HTMLDivElement>(null)
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

  function handleDragCanvas(e: React.DragEvent<HTMLDivElement>) {
    const moveX = e.clientX - dragSrcPos.x
    const moveY = e.clientY - dragSrcPos.y
    const newPos = {
      x: dragInitialCanvasPos.x + moveX,
      y: dragInitialCanvasPos.y + moveY - 40,
    }
    if (canvasRef.current) {
      canvasRef.current.style.left = `${newPos.x}px`
      canvasRef.current.style.top = `${newPos.y}px`
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

  useEffect(() => {
    const ctrlCode = 'ControlLeft',
      shiftCode = 'ShiftLeft'
    function onKeyDown(e: KeyboardEvent) {
      console.log('onKeyDown', e)
      if (e.code === ctrlCode) {
        console.log('lctrl')
      } else if (e.code === shiftCode) {
        console.log('lshift')
      }
    }
    function onMouseUp(e: MouseEvent) {
      isDraggingCanvas = false
    }
    // window.addEventListener('keydown', onKeyDown)
    document.addEventListener('mouseup', onMouseUp)
    return () => {
      // window.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('mouseup', onMouseUp)
    }
  }, [])
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
    }
  }, [])
  return (
    <div
      className={classnames(styles.wrapper)}
      onContextMenu={handleWwitchCursorType}>
      {/* 画布 */}
      <div
        ref={canvasRef}
        draggable={canDragCanvas}
        className={styles.canvas}
        onMouseDown={(e) => {
          dragSrcPos = {
            x: e.clientX,
            y: e.clientY,
          }
          if (canvasRef.current) {
            const { left, top } = canvasRef.current.getBoundingClientRect()
            dragInitialCanvasPos = {
              x: left,
              y: top,
            }
          }
        }}
        onDragStart={(e) => {
          isDraggingCanvas = true
        }}
        onDrag={debouncedDragCanvas}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          isDraggingCanvas = false
          console.log('onDrop')
        }}>
        c
      </div>
    </div>
  )
}
