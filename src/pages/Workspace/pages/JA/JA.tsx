import React from 'react'
import styles from './JA.module.less'

export default function JA() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.toolsWrapper}>
        <span className={styles.noti}>团队空间</span>
        <span className={styles.create}>
          <img src="/create-space.png" alt="" />
          创建空间
        </span>
      </div>
      <div className={styles.spacesListWrapper}>space list</div>
    </div>
  )
}
