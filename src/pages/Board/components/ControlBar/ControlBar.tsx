import React, { useEffect } from 'react'
import classnames from 'classnames'
import { useSelector } from 'react-redux'
import { Tooltip } from 'antd'
import { ReactComponent as SVGControlsPointer1 } from '@assets/imgs/controls-pointer1.svg'
import { ReactComponent as SVGControlsPointer2 } from '@assets/imgs/controls-pointer2.svg'
import { ReactComponent as SVGControlsXiexiangfa } from '@assets/imgs/controls-xiexiangfa.svg'
import { ReactComponent as SVGControlsHuatuya } from '@assets/imgs/controls-huatuya.svg'
import { ReactComponent as SVGControlsJulizi } from '@assets/imgs/controls-julizi.svg'
import { ReactComponent as SVGControlsTiecankao } from '@assets/imgs/controls-tiecankao.svg'
import { ReactComponent as SVGControlsQushika } from '@assets/imgs/controls-qushika.svg'
import { ReactComponent as SVGControlsJianmuban } from '@assets/imgs/controls-jianmuban.svg'
import { ReactComponent as SVGControlsXiexiangfaOpt1 } from '@assets/imgs/controls-xiexiangfa-opt1.svg'
import { ReactComponent as SVGControlsXiexiangfaOpt2 } from '@assets/imgs/controls-xiexiangfa-opt2.svg'
import { ReactComponent as SVGControlsXiexiangfaOpt3 } from '@assets/imgs/controls-xiexiangfa-opt3.svg'
import { ReactComponent as SVGControlsXiexiangfaOpt4 } from '@assets/imgs/controls-xiexiangfa-opt4.svg'
import { ReactComponent as SVGControlsXiexiangfaOpt5 } from '@assets/imgs/controls-xiexiangfa-opt5.svg'
import { updateCursorType, ECursorType } from '@models/board'
import type { RootState } from '@models/index'
import styles from './ControlBar.module.less'

export default function ControlBar() {
  const { cursorType } = useSelector((rootState: RootState) => rootState.board)
  const isdefaultActive = cursorType === ECursorType.pointer // 默认的指针
  const isPalmActive = cursorType === ECursorType.palm // 手掌
  const isXiexiangfaActive =
    cursorType === ECursorType.xiexiangfa1 ||
    cursorType === ECursorType.xiexiangfa2 ||
    cursorType === ECursorType.xiexiangfa3 ||
    cursorType === ECursorType.xiexiangfa4 ||
    cursorType === ECursorType.xiexiangfa5

  function handleChangeCursorType(t: ECursorType) {
    updateCursorType(t)
  }

  function handlePressXiexiangfa() {}
  function handlePressHuatuya() {}
  function handlePressJulizi() {}
  function handlePressTiecankao() {}
  function handlePressQushika() {}
  function handlePressJianmuban() {}

  const xieXiangfaMenu = (
    <div className={styles.xieXaingfaMenuWrapper}>
      <Tooltip
        title={<div style={{ textAlign: 'center' }}>S</div>}
        placement="bottom">
        <span
          className={styles.optBtn}
          onClick={() => handleChangeCursorType(ECursorType.xiexiangfa1)}>
          <SVGControlsXiexiangfaOpt1 />
        </span>
      </Tooltip>
      <Tooltip
        title={<div style={{ textAlign: 'center' }}>Shift + S</div>}
        placement="bottom">
        <span
          className={styles.optBtn}
          onClick={() => handleChangeCursorType(ECursorType.xiexiangfa2)}>
          <SVGControlsXiexiangfaOpt2 />
        </span>
      </Tooltip>
      <Tooltip
        title={<div style={{ textAlign: 'center' }}>O</div>}
        placement="bottom">
        <span
          className={styles.optBtn}
          onClick={() => handleChangeCursorType(ECursorType.xiexiangfa3)}>
          <SVGControlsXiexiangfaOpt3 />
        </span>
      </Tooltip>
      <Tooltip
        title={<div style={{ textAlign: 'center' }}>A</div>}
        placement="bottom">
        <span
          className={styles.optBtn}
          onClick={() => handleChangeCursorType(ECursorType.xiexiangfa4)}>
          <SVGControlsXiexiangfaOpt4 />
        </span>
      </Tooltip>
      <Tooltip
        title={<div style={{ textAlign: 'center' }}>Q</div>}
        placement="bottom">
        <span
          className={styles.optBtn}
          onClick={() => handleChangeCursorType(ECursorType.xiexiangfa5)}>
          <SVGControlsXiexiangfaOpt5 />
        </span>
      </Tooltip>
    </div>
  )

  return (
    <div className={styles.wrapper}>
      <Tooltip title="选取 V" placement="right">
        <div
          onClick={() => {
            handleChangeCursorType(ECursorType.pointer)
          }}
          className={classnames(styles.box, isdefaultActive && styles.active)}>
          <SVGControlsPointer1 />
        </div>
      </Tooltip>
      <Tooltip title="抓手 Space" placement="right">
        <div
          onClick={() => {
            handleChangeCursorType(ECursorType.palm)
          }}
          className={classnames(styles.box, isPalmActive && styles.active)}>
          <SVGControlsPointer2 />
        </div>
      </Tooltip>
      <div className={styles.gap}></div>
      <Tooltip
        overlayClassName={styles.xieXiangfaMenuOverlay}
        title={isPalmActive ? undefined : xieXiangfaMenu}
        placement="right">
        <div
          onClick={isPalmActive ? undefined : handlePressXiexiangfa}
          className={classnames(
            styles.box,
            isPalmActive && styles.disabled,
            isXiexiangfaActive && styles.active,
          )}>
          <SVGControlsXiexiangfa style={{ width: 18 }} />
          <span>写想法</span>
        </div>
      </Tooltip>

      <Tooltip
        title={
          isPalmActive ? null : <div style={{ textAlign: 'center' }}>P</div>
        }
        placement="right">
        <div
          onClick={isPalmActive ? undefined : handlePressHuatuya}
          className={classnames(styles.box, isPalmActive && styles.disabled)}>
          <SVGControlsHuatuya />
          <span>画涂鸦</span>
        </div>
      </Tooltip>
      <Tooltip
        title={
          isPalmActive ? null : <div style={{ textAlign: 'center' }}>E</div>
        }
        placement="right">
        <div
          onClick={isPalmActive ? undefined : handlePressJulizi}
          className={classnames(styles.box, isPalmActive && styles.disabled)}>
          <SVGControlsJulizi />
          <span>举例子</span>
        </div>
      </Tooltip>
      <Tooltip
        title={
          isPalmActive ? null : <div style={{ textAlign: 'center' }}>R</div>
        }
        placement="right">
        <div
          onClick={isPalmActive ? undefined : handlePressTiecankao}
          className={classnames(styles.box, isPalmActive && styles.disabled)}>
          <SVGControlsTiecankao />
          <span>贴参考</span>
        </div>
      </Tooltip>
      <div className={styles.gap}></div>
      <div
        onClick={isPalmActive ? undefined : handlePressQushika}
        className={classnames(styles.box, isPalmActive && styles.disabled)}>
        <SVGControlsQushika style={{ width: 17 }} />
        <span>趋势卡</span>
      </div>
      <div
        onClick={isPalmActive ? undefined : handlePressJianmuban}
        className={classnames(styles.box, isPalmActive && styles.disabled)}>
        <SVGControlsJianmuban style={{ width: 18 }} />
        <span>建模板</span>
      </div>
    </div>
  )
}
