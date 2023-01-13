import React, { memo, useCallback } from 'react'
import './PlayList.scss'
import PlayListItem from './PlayListItem'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentIndex, updatePlayList } from '../../store/JinPlayReducer'
import SortableList from '../sortable/SortableList'
import { IoClose } from "react-icons/io5";

function PlayList({showing, setShowing}) {

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
      <div className='play-list-head'>
        <h2>Play List</h2>
        <IoClose onClick={() => setShowing(false)}/>
      </div>

      <SortableList
      data={JinPlayList}
      onDropItem={onDropItem}
      onClickItem={onClickItem}
      renderItem={renderItem}
      />
    </div>
  )
}

export default memo(PlayList) 