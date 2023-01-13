import { duration } from '@mui/material';
import React, { forwardRef, memo, useCallback, useImperativeHandle, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { nextMusic, pauseMusic, playMusic, updateCurrentTime, updateDurationTime } from '../../store/JinPlayReducer';
import './Progressbar.scss'

function ProgressBar(props, ref) {

  const audioRef = useRef();
  const dispatch = useDispatch()
  const {currentTime, duration, JinPlayList, currentIndex} = useSelector(state => ({currentTime : state.currentTime , duration: state.duration, JinPlayList : state.JinPlayList, currentIndex : state.currentIndex}))

  const progressBarWidth = `${Math.round((currentTime * 100) / duration)}%`;

  useImperativeHandle(ref, () => ({
    play: () => {
      audioRef.current.play()
    },
    pause : () => {
      audioRef.current.pause()
    },
    changeVolume : (volume) => {
      audioRef.current.volume = volume
    },
    resetCurrentTime : () => {
      audioRef.current.currentTime = 0;
    }
  }))

  const onPlay = useCallback(() => {
    dispatch(playMusic())
  },[dispatch])

  const onPause = useCallback(() => {
    dispatch(pauseMusic())
  },[dispatch])

  const getTime = useCallback((time) => {
    const minute = `0${parseInt(time/60, 10)}`
    const seconds = `0${parseInt(time % 60)}`
    return `${minute}:${seconds.slice(-2)}`
  }, [])

  const onDragProgressBar = (event) => {
    audioRef.current.currentTime = event.target.value;
    dispatch(updateCurrentTime(event.target.value))
  }

  const onTimeUpdate = useCallback((event) => {
    if(event.target.readyState === 0) return; // 실제 실행하는 함수에의 상태 변화를 나타내는 상태 (응답처리)
    dispatch(updateCurrentTime(event.target.currentTime))
    dispatch(updateDurationTime(event.target.duration))

  },[dispatch])

  const onEnded = useCallback(() => {
    dispatch(nextMusic())
  }, [dispatch])

  return (
    <div className='progress-area'>
        <div className="progressbar-wrap">
          <input type="range" className='progress-bar' onChange={onDragProgressBar} min={0} max={duration || 0} value={currentTime}/>
          <div className='progressbar-color'
          style={{transform:`translateX(${progressBarWidth})`}}
          />
        </div>

        <audio
              autoPlay
            ref={audioRef}
             src={JinPlayList[currentIndex].src}
             onPlay={onPlay}
             onPause={onPause}
             onTimeUpdate={onTimeUpdate}
             onEnded={onEnded}
          />
        <div className='music-time'>
            <span>{getTime(currentTime)}</span>
            <span>{getTime(duration)}</span>
        </div>
    </div>
  )
}

export default memo(forwardRef(ProgressBar)) 