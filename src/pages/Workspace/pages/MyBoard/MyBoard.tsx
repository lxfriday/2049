import React from 'react'
import styles from './MyBoard.module.less'
import ToolBar from './components/ToolBar/ToolBar'
import List from './components/List/List'
import SideTools from './components/SideTools/SideTools'

export default function MyBoard() {
  const listData = [
    {
      id: Math.random(),
      pic: 'https://aiux-cdn-1306676710.file.myqcloud.com/images/20230202_070159_/IMG_20230202_070159__056256.png',
      name: '未命名',
      createdAt: '2小时前创建',
    },
    {
      id: Math.random(),
      pic: 'https://aiux-cdn-1306676710.file.myqcloud.com/images/20230202_055952_/IMG_20230202_055952__217267.png',
      name: '未命名',
      createdAt: '2小时前创建',
    },
    {
      id: Math.random(),
      pic: 'https://aiux-cdn-1306676710.file.myqcloud.com/images/20230201_084702_/IMG_20230201_084702__678572.png',
      name: '未命名',
      createdAt: '2小时前创建',
    },
    {
      id: Math.random(),
      pic: 'https://aiux-cdn-1306676710.file.myqcloud.com/images/20230201_072135_/IMG_20230201_072135__211388.png',
      name: '未命名',
      createdAt: '2小时前创建',
    },
    {
      id: Math.random(),
      pic: 'https://aiux-cdn-1306676710.file.myqcloud.com/images/20230201_043953_/IMG_20230201_043953__937104.png',
      name: '未命名',
      createdAt: '2小时前创建',
    },
    {
      id: Math.random(),
      pic: 'https://aiux-cdn-1306676710.file.myqcloud.com/images/20230201_040156_/IMG_20230201_040156__944395.png',
      name: '未命名',
      createdAt: '2小时前创建',
    },
    {
      id: Math.random(),
      pic: 'https://aiux-cdn-1306676710.file.myqcloud.com/images/20230201_035741_/IMG_20230201_035741__768304.png',
      name: '未命名',
      createdAt: '2小时前创建',
    },
    {
      id: Math.random(),
      pic: 'https://aiux-cdn-1306676710.file.myqcloud.com/images/20230201_035725_/IMG_20230201_035725__190025.png',
      name: '未命名',
      createdAt: '2小时前创建',
    },
    {
      id: Math.random(),
      pic: 'https://aiux-cdn-1306676710.file.myqcloud.com/images/20230201_035725_/IMG_20230201_035725__190025.png',
      name: '未命名',
      createdAt: '2小时前创建',
    },
    {
      id: Math.random(),
      pic: 'https://aiux-cdn-1306676710.file.myqcloud.com/images/20230201_035725_/IMG_20230201_035725__190025.png',
      name: '未命名',
      createdAt: '2小时前创建',
    },
    {
      id: Math.random(),
      pic: 'https://aiux-cdn-1306676710.file.myqcloud.com/images/20230201_035725_/IMG_20230201_035725__190025.png',
      name: '未命名',
      createdAt: '2小时前创建',
    },
    {
      id: Math.random(),
      pic: 'https://aiux-cdn-1306676710.file.myqcloud.com/images/20230201_035725_/IMG_20230201_035725__190025.png',
      name: '未命名',
      createdAt: '2小时前创建',
    },
    {
      id: Math.random(),
      pic: 'https://aiux-cdn-1306676710.file.myqcloud.com/images/20230201_035725_/IMG_20230201_035725__190025.png',
      name: '未命名',
      createdAt: '2小时前创建',
    },
    {
      id: Math.random(),
      pic: 'https://aiux-cdn-1306676710.file.myqcloud.com/images/20230201_035725_/IMG_20230201_035725__190025.png',
      name: '未命名',
      createdAt: '2小时前创建',
    },
    {
      id: Math.random(),
      pic: 'https://aiux-cdn-1306676710.file.myqcloud.com/images/20230201_035725_/IMG_20230201_035725__190025.png',
      name: '未命名',
      createdAt: '2小时前创建',
    },
    {
      id: Math.random(),
      pic: 'https://aiux-cdn-1306676710.file.myqcloud.com/images/20230201_035725_/IMG_20230201_035725__190025.png',
      name: '未命名',
      createdAt: '2小时前创建',
    },
    {
      id: Math.random(),
      pic: 'https://aiux-cdn-1306676710.file.myqcloud.com/images/20230201_035725_/IMG_20230201_035725__190025.png',
      name: '未命名',
      createdAt: '2小时前创建',
    },
    {
      id: Math.random(),
      pic: 'https://aiux-cdn-1306676710.file.myqcloud.com/images/20230201_035725_/IMG_20230201_035725__190025.png',
      name: '未命名',
      createdAt: '2小时前创建',
    },
    {
      id: Math.random(),
      pic: 'https://aiux-cdn-1306676710.file.myqcloud.com/images/20230201_035725_/IMG_20230201_035725__190025.png',
      name: '未命名',
      createdAt: '2小时前创建',
    },
    {
      id: Math.random(),
      pic: 'https://aiux-cdn-1306676710.file.myqcloud.com/images/20230201_035725_/IMG_20230201_035725__190025.png',
      name: '未命名',
      createdAt: '2小时前创建',
    },
    {
      id: Math.random(),
      pic: 'https://aiux-cdn-1306676710.file.myqcloud.com/images/20230201_035725_/IMG_20230201_035725__190025.png',
      name: '未命名',
      createdAt: '2小时前创建',
    },
    {
      id: Math.random(),
      pic: 'https://aiux-cdn-1306676710.file.myqcloud.com/images/20230201_035725_/IMG_20230201_035725__190025.png',
      name: '未命名',
      createdAt: '2小时前创建',
    },
    {
      id: Math.random(),
      pic: 'https://aiux-cdn-1306676710.file.myqcloud.com/images/20230201_035725_/IMG_20230201_035725__190025.png',
      name: '未命名',
      createdAt: '2小时前创建',
    },
  ]
  return (
    <div className={styles.wrapper}>
      <div className={styles.contentWrapper}>
        <ToolBar />
        <List data={listData} />
      </div>
      <SideTools />
    </div>
  )
}
