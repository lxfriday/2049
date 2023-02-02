import React from 'react'
import styles from './index.module.less'
import ToolBar from './components/ToolBar'

export default function MyBoard() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.contentWrapper}>
        <ToolBar />
      </div>
      <div className={styles.sideTools}>sideTools</div>
    </div>
  )
}
