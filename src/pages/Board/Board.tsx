import React from 'react'
import Nav from './components/Nav/Nav'
import styles from './Board.module.less'

export default function Board() {
  return (
    <div className={styles.wrapper}>
      <Nav />
    </div>
  )
}
