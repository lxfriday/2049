import React from 'react'
import styles from './ListItem.module.less'

export interface IItem {
  id: string | number
  pic: string
  name: string
  createdAt: string
  onClick?(): void
}

export default function ListItem({ id, pic, name, createdAt, onClick }: IItem) {
  return (
    <div className={styles.wrapper} onClick={onClick}>
      <div className={styles.imgWrapper}>
        <img src={pic} alt="" />
      </div>
      <span className={styles.name}>{name}</span>
      <span className={styles.createdAt}>{createdAt}</span>
    </div>
  )
}
