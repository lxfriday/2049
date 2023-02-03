import React, { useState } from 'react'
import { Input, Dropdown } from 'antd'
import {
  ClockCircleOutlined,
  CaretDownOutlined,
  SearchOutlined,
  CheckOutlined,
} from '@ant-design/icons'
import type { MenuProps } from 'antd'
import styles from './ToolBar.module.less'

export default function ToolBar() {
  const [selectedSource, setSelectedSource] = useState({
    key: '1',
    label: '所有白板',
  })
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <span
          style={{ color: selectedSource.key === '1' ? '#f66f75' : '#000' }}>
          所有白板
          {selectedSource.key === '1' && (
            <CheckOutlined style={{ marginLeft: 6 }} />
          )}
        </span>
      ),
      onClick(e) {
        setSelectedSource({ key: '1', label: '所有白板' })
      },
    },
    {
      key: '2',
      label: (
        <span
          style={{ color: selectedSource.key === '2' ? '#f66f75' : '#000' }}>
          自己创建
          {selectedSource.key === '2' && (
            <CheckOutlined style={{ marginLeft: 6 }} />
          )}
        </span>
      ),
      onClick() {
        setSelectedSource({ key: '2', label: '自己创建' })
      },
    },
    {
      key: '3',
      label: (
        <span
          style={{ color: selectedSource.key === '3' ? '#f66f75' : '#000' }}>
          他人创建
          {selectedSource.key === '3' && (
            <CheckOutlined style={{ marginLeft: 6 }} />
          )}
        </span>
      ),
      onClick() {
        setSelectedSource({ key: '3', label: '他人创建' })
      },
    },
    {
      key: '4',
      label: (
        <span
          style={{ color: selectedSource.key === '4' ? '#f66f75' : '#000' }}>
          来自团队
          {selectedSource.key === '4' && (
            <CheckOutlined style={{ marginLeft: 6 }} />
          )}
        </span>
      ),
      onClick() {
        setSelectedSource({
          key: '4',
          label: '来自团队',
        })
      },
    },
  ]

  return (
    <div className={styles.wrapper}>
      <div className={styles.recent}>
        <ClockCircleOutlined /> <span className={styles.noti}>最近使用</span>
      </div>
      <div className={styles.optionsWrapper}>
        <Input
          prefix={<SearchOutlined style={{ color: '#d9d9d9', fontSize: 20 }} />}
          allowClear
          placeholder="输入「关键词」，敲「回车」搜索"
          className={styles.search}
        />
        <Dropdown menu={{ items }}>
          <div className={styles.sourceWrapper}>
            <span className={styles.noti}>{selectedSource.label}</span>
            <CaretDownOutlined style={{ marginLeft: 5 }} />
          </div>
        </Dropdown>
      </div>
    </div>
  )
}
