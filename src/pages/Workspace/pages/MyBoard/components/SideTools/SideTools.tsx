import React from 'react'
import SpaceItem from './components/SpaceItem/SpaceItem'
import type { ISpaceItem } from './components/SpaceItem/SpaceItem'
import styles from './SideTools.module.less'

export default function SideTools() {
  const listData: ISpaceItem[] = [
    {
      id: Math.random(),
      title: '28天创新养成计划',
      tags: ['水平思考', '创新训练'],
    },
    {
      id: Math.random(),
      title: 'Design Thinking（可以用来管理设计项目哦）',
      tags: ['B端'],
    },
  ]
  return (
    <div className={styles.wrapper}>
      <img
        className={styles.noti}
        src="https://2049.net/static/img/space-banner.png"
        alt=""
      />
      <div className={styles.spacesWrapper}>
        <div className={styles.titleWrapper}>
          <span className={styles.mime}>我的空间</span>
          <span className={styles.create}>
            <img src="/create-space.png" alt="" />
            创建空间
          </span>
        </div>
        <div className={styles.listWrapper}>
          {listData.map((_) => (
            <SpaceItem key={_.id} {..._} />
          ))}
        </div>
      </div>
    </div>
  )
}
