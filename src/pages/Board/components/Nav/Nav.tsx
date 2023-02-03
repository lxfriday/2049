import React from 'react'
import classnames from 'classnames'
import { Input, Tooltip, Dropdown } from 'antd'
import {
  TeamOutlined,
  DownloadOutlined,
  FileImageOutlined,
} from '@ant-design/icons'
import type { MenuProps } from 'antd'

import styles from './Nav.module.less'

const items: MenuProps['items'] = [
  {
    label: '所有成员',
    icon: <TeamOutlined />,
    key: '1',
  },
  {
    type: 'divider',
    style: {
      backgroundColor: '#333',
    },
  },
  {
    label: '生成创新报告',
    icon: <DownloadOutlined />,
    key: '2',
  },

  {
    label: '导出为图片',
    icon: <FileImageOutlined />,
    key: '3',
  },
]

export default function Nav() {
  return (
    <div className={styles.wrapper}>
      <Tooltip title="回到我的白板">
        <div className={styles.logoAndTitle}>
          <img src="/board-title-logo.svg" alt="" />
          <span>(DEV)</span>
        </div>
      </Tooltip>
      <div className={styles.boardInfoWrapper}>
        <div className={styles.boardName}>
          <Tooltip title="点击编辑名称">
            <div className={styles.name}>未命名</div>
          </Tooltip>
          <div className={styles.savedAt}>已保存 12:13</div>
        </div>
        <div className={styles.historyWrapper}>
          <Tooltip title="撤销 Ctrl+Z">
            <div className={styles.back}>
              <img src="/history-back.svg" alt="" />
            </div>
          </Tooltip>
          <Tooltip title="重做 Ctrl+shift+Z">
            <div className={styles.forward}>
              <img src="/history-forward.svg" alt="" />
            </div>
          </Tooltip>
        </div>
      </div>
      <div className={styles.toolsWrapper}>
        <span className={styles.itemWrapper}>
          <img src="/timing.svg" alt="" />
          <span>计时</span>
        </span>
        <span className={styles.itemWrapper}>
          <img src="/interactive.svg" alt="" />
          <span>互动模式</span>
        </span>
        <div className={styles.gap}></div>
        <Tooltip title="Ctrl+H">
          <span className={styles.itemWrapper}>
            <img src="/keyboard.svg" alt="" />
            <span>快捷键</span>
          </span>
        </Tooltip>
        <Tooltip title="Ctrl+M">
          <span className={styles.itemWrapper}>
            <img src="/temp-setting.svg" alt="" />
            <span>模板设置</span>
          </span>
        </Tooltip>
        <Tooltip title="Ctrl+L">
          <span className={styles.itemWrapper}>
            <img src="/board-data.svg" alt="" />
            <span>白板数据</span>
          </span>
        </Tooltip>
        <Dropdown menu={{ items }} overlayClassName={styles.menuOverLay}>
          <span className={styles.itemWrapper}>
            <img src="/more.svg" alt="" />
            <span>更多</span>
          </span>
        </Dropdown>
      </div>
    </div>
  )
}
