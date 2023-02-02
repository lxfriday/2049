import React from 'react'
import { Outlet } from 'react-router-dom'
import Nav from './components/Nav'
import Menu from './components/Menu'
import styles from './index.module.less'

export default function Workspace() {
  return (
    <div className={styles.wrapper}>
      <Nav />
      <Menu />
      <Outlet />
    </div>
  )
}
