import React, { useCallback } from 'react'
import './PlayList.scss'
import PlayListItem from './PlayListItem'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentIndex, updatePlayList } from '../../store/JinPlayReducer'
import SortableList from '../sortable/SortableList'

function PlayList({showing}) {

  const { JinPlayList } = useSelector((state) => ({JinPlayList : state.JinPlayList}))
  const dispatch = useDispatch()

  const onClickItem = useCallback((index) => {
    dispatch(setCurrentIndex(index))
  },[dispatch])

  const onDropItem = useCallback((newPlayList) => {
    dispatch(updatePlayList(newPlayList))
  },[dispatch])

  const renderItem = useCallback((item,index) => {
   return <PlayListItem index={index} item={item} />
  },[])

  return (
    <div className={showing ? `play-list showPlayList` : "play-list"}>
      <h2>Play List</h2>
      <SortableList
      data={JinPlayList}
      onDropItem={onDropItem}
      onClickItem={onClickItem}
      renderItem={renderItem}
      />
    </div>
  )
}

export default PlayList