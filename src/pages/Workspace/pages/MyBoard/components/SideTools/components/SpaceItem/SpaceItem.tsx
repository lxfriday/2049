import React from 'react'
import { DeleteFilled } from '@ant-design/icons'
import styles from './SpaceItem.module.less'

export interface ISpaceItem {
  id: number
  title: string
  tags: string[]
}

export default function SpaceItem({ id, title, tags }: ISpaceItem) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.imgWrapper}>
        <img className={styles.line} src="/blue-line.png" alt="" />
        <img className={styles.space} src="/space_icon_02.png" alt="" />
      </div>
      <div className={styles.contentWrapper}>
        <div className={styles.title}>{title}</div>
        <div className={styles.tagsWrapper}>
          {tags.map((_) => (
            <span key={_} className={styles.tag}>
              {_}
            </span>
          ))}
        </div>
      </div>
      <div className={styles.rightTopOptsWrapper}>
        <DeleteFilled title='删除' className={styles.delete} />
      </div>
      <div className={styles.leftTopAngle}></div>
      <div className={styles.rightBottomAngle}></div>
    </div>
  )
}
