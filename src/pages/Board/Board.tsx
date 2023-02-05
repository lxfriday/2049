import React, { useRef } from 'react'
import Nav from './components/Nav/Nav'
import ControlBar from './components/ControlBar/ControlBar'
import Content from './components/Content/Content'
import ZoomTools from './components/ZoomTools/ZoomTools'
import { ECursorType } from '@models/board'
import styles from './Board.module.less'

export type canvasHandleRefType = React.MutableRefObject<{
  updateCursor(t: ECursorType): void
  resetScale(): void
  scaleUp(): void
  scaleDown(): void
} | null>

export default function Board() {
  const canvasHandleRef: canvasHandleRefType = useRef(null)
  return (
    <div className={styles.wrapper}>
      <Nav />
      <ControlBar
        updateCursor={(t) => {
          if (canvasHandleRef.current) {
            canvasHandleRef.current.updateCursor(t)
          }
        }}
      />
      <Content canvasHandleRef={canvasHandleRef} />
      <ZoomTools
        handleScaleUp={() => {
          if (canvasHandleRef.current) {
            canvasHandleRef.current.scaleUp()
          }
        }}
        handleScaleDown={() => {
          if (canvasHandleRef.current) {
            canvasHandleRef.current.scaleDown()
          }
        }}
        handleResetZoom={() => {
          if (canvasHandleRef.current) {
            canvasHandleRef.current.resetScale()
          }
        }}
      />
    </div>
  )
}
