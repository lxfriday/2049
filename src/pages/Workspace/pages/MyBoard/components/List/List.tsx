import React, { useEffect, useRef } from 'react'
import styles from './List.module.less'
import ListItem from './components/ListItem/ListItem'
import Scrollbar from 'smooth-scrollbar'
import type { IItem } from './components/ListItem/ListItem'

interface IList {
  data: IItem[]
}

export default function List({ data }: IList) {
  const listRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (listRef.current) {
      // https://idiotwu.github.io/smooth-scrollbar/
      Scrollbar.init(listRef.current, {})
    }
  }, [])
  return (
    <div ref={listRef} className={styles.wrapper}>
      {data.map((_) => (
        <ListItem key={_.id} {..._} />
      ))}
    </div>
  )
}
