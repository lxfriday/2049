import React from 'react'
import { Outlet } from 'react-router-dom'
import Nav from './components/Nav/Nav'
import Menu from './components/Menu/Menu'
import styles from './Workspace.module.less'

export default function Workspace() {
  return (
    <div className={styles.wrapper}>
      <Nav />
      <Menu />
      <Outlet />
    </div>
  )
}
