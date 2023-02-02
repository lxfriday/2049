import React from 'react'
import { Dropdown } from 'antd'
import styles from './index.module.less'

import type { MenuProps, DropdownProps } from 'antd'

interface IDropDown {
  children: React.ReactNode
  trigger: DropdownProps['trigger']
  items: MenuProps['items']
}

export default function DropDownComp({ children, trigger, items }: IDropDown) {
  return (
    <Dropdown
      overlayClassName={styles.overlay}
      menu={{ items }}
      trigger={trigger}>
      {children}
    </Dropdown>
  )
}
