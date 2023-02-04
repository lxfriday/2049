import React from 'react'
import Nav from './components/Nav/Nav'
import ControlBar from './components/ControlBar/ControlBar'
import Content from './components/Content/Content'
import styles from './Board.module.less'

export default function Board() {
  return (
    <div className={styles.wrapper}>
      <Nav />
      <ControlBar />
      <Content />
    </div>
  )
}
