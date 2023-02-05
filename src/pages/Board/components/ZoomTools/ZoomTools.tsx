import React from 'react'
import {
  BorderOuterOutlined,
  MinusOutlined,
  PlusOutlined,
} from '@ant-design/icons'
import { useSelector } from 'react-redux'
import type { RootState } from '@models/index'

import styles from './ZoomTools.module.less'

interface IZoomTools {
  handleResetZoom(): void
  handleScaleUp(): void
  handleScaleDown(): void
}

export default function ZoomTools({
  handleResetZoom,
  handleScaleUp,
  handleScaleDown,
}: IZoomTools) {
  const { canvasScale } = useSelector((rootState: RootState) => rootState.board)
  return (
    <div className={styles.wrapper}>
      <div
        onClick={handleResetZoom}
        className={styles.box}
        title="重置缩放比例">
        <BorderOuterOutlined />
      </div>
      <div onClick={handleScaleDown} className={styles.box} title="缩小">
        <MinusOutlined />
      </div>
      <div onClick={handleResetZoom} className={styles.scale}>
        {`${parseInt(String(canvasScale * 100))} %`}
      </div>
      <div onClick={handleScaleUp} className={styles.box} title="放大">
        <PlusOutlined />
      </div>
    </div>
  )
}
