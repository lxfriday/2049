import React, { useRef } from 'react'
import Nav from './components/Nav/Nav'
import ControlBar from './components/ControlBar/ControlBar'
import Content from './components/Content/Content'
import { ECursorType } from '@models/board'
import styles from './Board.module.less'

export default function Board() {
  const canvasHandleRef = useRef<{ updateCursor(t: ECursorType): void } | null>(
    null,
  )
  return (
    <div className={styles.wrapper}>
      <Nav />
      <ControlBar canvasHandleRef={canvasHandleRef} />
      <Content canvasHandleRef={canvasHandleRef} />
    </div>
  )
}
