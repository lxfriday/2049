import React from 'react'
import classnames from 'classnames'
import { Tooltip } from 'antd'
import { ClusterOutlined, HomeOutlined } from '@ant-design/icons'
import { useNavigate, useLocation } from 'react-router-dom'

import styles from './Menu.module.less'

export default function Menu() {
  const navigateTo = useNavigate()
  const { pathname } = useLocation()
  const selectedMenu = pathname.split('/')[2]
  console.log('location', selectedMenu)
  return (
    <div className={styles.wrapper}>
      <MenuItem
        {...{
          key: 'myboard',
          title: '我的白板',
          active: selectedMenu === 'myboard',
          prefix: <HomeOutlined />,
          wrapperStyle: { marginTop: 10 },
          onClick() {
            navigateTo('myboard')
          },
        }}
      />
      <MenuItem
        {...{
          key: 'ja',
          title: 'JA',
          active: selectedMenu === 'ja',
          prefix: <ClusterOutlined />,
          wrapperStyle: { marginTop: 10 },
          onClick() {
            navigateTo('ja')
          },
        }}
      />
      <MenuItem
        {...{
          key: 'resources',
          title: '资源库',
          active: selectedMenu === 'resources',
          prefix: '🚀',
          wrapperStyle: {
            marginTop: 10,
            marginBottom: 15,
            paddingTop: 10,
            paddingBottom: 10,
            borderTop: '1px solid #eee',
            borderBottom: '1px solid #eee',
          },
          onClick() {
            navigateTo('resources')
          },
        }}
      />
      <MenuItem
        {...{
          key: 'allways',
          title: '所有方法',
          active: selectedMenu === 'allways',
          prefix: '🌟',
          onClick() {
            navigateTo('allways')
          },
        }}
      />
      <MenuItem
        {...{
          key: 'guide',
          title: '玩转指南',
          active: selectedMenu === 'guide',
          prefix: '⛺',
          onClick() {
            navigateTo('guide')
          },
        }}
      />
      <MenuItem
        {...{
          key: 'leading',
          title: '行业领先',
          active: selectedMenu === 'leading',
          prefix: '🔥',
          onClick() {
            navigateTo('leading')
          },
        }}
      />
      <MenuItem
        {...{
          key: 'brainstorm',
          title: '头脑风暴',
          active: selectedMenu === 'brainstorm',
          onClick() {
            navigateTo('brainstorm')
          },
        }}
      />
      <MenuItem
        {...{
          key: 'designthinking',
          title: '设计思维',
          active: selectedMenu === 'designthinking',
          onClick() {
            navigateTo('designthinking')
          },
        }}
      />
      <MenuItem
        {...{
          key: 'analyze',
          title: '调研分析',
          active: selectedMenu === 'analyze',
          onClick() {
            navigateTo('analyze')
          },
        }}
      />
      <MenuItem
        {...{
          key: 'strategicplanning',
          title: '策略规划',
          active: selectedMenu === 'strategicplanning',
          onClick() {
            navigateTo('strategicplanning')
          },
        }}
      />
      <MenuItem
        {...{
          key: 'evaluationdecision',
          title: '评估决策',
          active: selectedMenu === 'evaluationdecision',
          onClick() {
            navigateTo('evaluationdecision')
          },
        }}
      />
      <MenuItem
        {...{
          key: 'meeting',
          title: '高效会议',
          active: selectedMenu === 'meeting',
          onClick() {
            navigateTo('meeting')
          },
        }}
      />
      <MenuItem
        {...{
          key: 'practice',
          title: '敏捷实践',
          active: selectedMenu === 'practice',
          onClick() {
            navigateTo('practice')
          },
        }}
      />
      <Tooltip
        trigger={['hover']}
        overlayClassName={styles.feedbackToolTip}
        title={
          <img
            className={styles.feedbackImg}
            src="/qrcode.png"
            alt="feedback"
          />
        }>
        <div className={styles.feedback}>反馈 & 建议</div>
      </Tooltip>
    </div>
  )
}

interface IMenuItem {
  key: string
  title: string
  active: boolean
  prefix?: React.ReactNode
  suffix?: React.ReactNode
  onClick?(): void
  onSuffixClick?(): void
  wrapperStyle?: React.CSSProperties
}

function MenuItem({
  title,
  active,
  prefix,
  suffix,
  onClick,
  onSuffixClick,
  wrapperStyle,
}: IMenuItem) {
  return (
    <div
      style={wrapperStyle}
      className={classnames(styles.itemWrapper, active && styles.active)}
      onClick={onClick}>
      <span className={styles.prefixWrapper}>{prefix}</span>
      <span className={styles.title}>{title}</span>
      <span className={styles.suffixWrapper} onClick={onSuffixClick}>
        {suffix}
      </span>
    </div>
  )
}
