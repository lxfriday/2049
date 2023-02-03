import React from 'react'
import { Button } from 'antd'
import { ToTopOutlined, CaretDownOutlined } from '@ant-design/icons'
import MyIcons from '@icons/MyIcons'
import DropDown from '@components/DropDown'
import styles from './Nav.module.less'

import type { MenuProps } from 'antd'

const avatarUrl =
  'https://aiux-cdn-1306676710.file.myqcloud.com/images/20230201_022433_/IMG_20230201_022433__813905.png'

const items: MenuProps['items'] = [
  {
    key: '1',
    label: (
      <span className={styles.avatarAndName}>
        <img src={avatarUrl} alt="avatar" />
        <span>2049_oAyhY</span>
      </span>
    ),
    style: {
      height: 60,
      cursor: 'auto',
    },
    onClick: (e: any) => {
      e.stopPropagation()
    },
  },
  {
    key: '2',
    label: (
      <span>
        <MyIcons type="icon-settings" style={{ fontSize: 16 }} />
        <span>账号设置</span>
      </span>
    ),
  },
  {
    key: '3',
    label: (
      <span>
        <MyIcons type="icon-quanbudingdan" style={{ fontSize: 19 }} />
        <span>订单管理</span>
      </span>
    ),
  },
  {
    type: 'divider',
  },
  {
    key: '4',
    label: (
      <span>
        <MyIcons type="icon-logout" style={{ fontSize: 18 }} />
        <span>退出登录</span>
      </span>
    ),
  },
]

export default function Workspace() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.logoAndName}>
        <img src="/logo.svg" className={styles.logo} alt="logo" />
        <span className={styles.siteName}>2049协同白板(DEV)</span>
      </div>
      <div className={styles.navTools}>
        <Button danger className={styles.navButton}>
          <MyIcons style={{ fontSize: 16 }} type="icon-lightningbshandian" />
          快速加入白板
        </Button>
        <Button type="primary" danger className={styles.navButton}>
          <ToTopOutlined style={{ fontSize: 16 }} />
          立即升级
        </Button>
        <DropDown trigger={['click']} items={items}>
          <div className={styles.avatar}>
            <img src={avatarUrl} alt="avatar" />
            <CaretDownOutlined
              className={styles.caret}
              style={{ fontSize: 8 }}
            />
          </div>
        </DropDown>
      </div>
    </div>
  )
}
