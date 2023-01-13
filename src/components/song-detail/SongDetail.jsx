import React, { memo } from 'react'
import './SongDetail.scss'
import newjeans from '../../image/newjeans.jpg'
import { useSelector } from 'react-redux'

function SongDetail() {

  const { JinPlayList, currentIndex, playing } = useSelector((state) => ({
    JinPlayList : state.JinPlayList, currentIndex : state.currentIndex, playing : state.playing
  }))

  return (
    <div className='song-detail'>
        <div className='current-play-state'>
          {playing ? "Now Playing" : "Not Playing"}
        </div>
        <div className='song-img'>
          <img src={JinPlayList[currentIndex].img} alt={JinPlayList[currentIndex].title} />
        </div>

        <dl className='song-info'>
            <dt>{JinPlayList[currentIndex].title}</dt>
            <dd>{JinPlayList[currentIndex].artist}</dd>
        </dl>
    </div>
  )
}

export default memo(SongDetail) 
