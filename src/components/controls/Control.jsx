import React, { memo, useCallback, useRef, useState } from 'react';
import './Control.scss'
import { BsPlayCircleFill, BsFillPauseCircleFill, BsSkipEndFill, BsSkipStartFill, BsFillVolumeDownFill, BsFillVolumeUpFill, BsFillVolumeMuteFill} from "react-icons/bs";
import { TbRepeatOnce, TbArrowsShuffle2, TbRepeat } from "react-icons/tb";
import { useDispatch, useSelector } from 'react-redux';
import { Slider } from '@mui/material';
import { nextMusic, prevMusic, setRepeat } from '../../store/JinPlayReducer';


const RepeatButton = memo(({repeat, ...props}) => {
  switch(repeat){
    case "ALL" :
      return <TbRepeat {...props}/>

    case "SHUFFLE" :
      return <TbArrowsShuffle2 {...props} />

    case "ONE" :
      return <TbRepeatOnce {...props}/>

    default : return null;
  }
})

function Control(
  {
    onPlay,
    onPause,
    changeVolume,
    resetMusic
  }
) {

  const [soundSize , setSoundSize] = useState(1)
  const {playing , repeat} = useSelector((state) => ({playing : state.playing , repeat : state.repeat}))
  const dispatch = useDispatch()

  const onClickPlay = useCallback(() => {
    if(repeat === "ONE"){
      resetMusic()
    }else{
      onPlay()
    }
  },[onPlay, resetMusic, repeat])

  const onClickPause = useCallback(() => {
    onPause()
  }, [onPause])

  const onChangeVolume = useCallback((event) => {
    changeVolume(soundSize)
    setSoundSize(event.target.value)
  },[changeVolume, soundSize])

  const onVolumeDown = useCallback(() => {
    setSoundSize(0)
    changeVolume(0)
  }, [changeVolume])

  const onVolumeUp = useCallback(() => {
    setSoundSize(1)
    changeVolume(1)
  },[changeVolume])

  const onClickPrev = useCallback(() => {
    if(repeat === "ONE") {
      resetMusic()
    }else{
      dispatch(prevMusic())
    }
  },[dispatch, resetMusic, repeat])

  const onClickNext = useCallback(() => {
    if(repeat === "ONE"){
      resetMusic()
    }else{
      dispatch(nextMusic())
    }

  },[dispatch, resetMusic, repeat])

  const onClickRepeat = useCallback(() => {
    dispatch(setRepeat())
  },[dispatch])
  
  return (
    <div className='control-area'>
        <RepeatButton repeat={repeat} onClick={onClickRepeat}/>
        <div className='music-play'>

          <BsSkipStartFill onClick={onClickPrev}/>
          {playing ? 
          <BsFillPauseCircleFill onClick={onClickPause}/> 
          : <BsPlayCircleFill onClick={onClickPlay}/>}
          <BsSkipEndFill onClick={onClickNext}/>
        </div>
        <div className='volume'>
          {
            soundSize > 0.5 ? <BsFillVolumeUpFill onClick={onVolumeDown}/> 
            : ( soundSize === 0 ? <BsFillVolumeMuteFill onClick={onVolumeUp}/> : <BsFillVolumeDownFill />)
          }
          <Slider
            type="range"
            style={{width:"50px"}}
            defaultValue={0.5}
            aria-label="Volume"
            max={1}
            min={0}
            step={0.1}
            value={soundSize || null}
            className="volume-slider"
            onChange={onChangeVolume}
            />
        </div>
    </div>
  )
}

export default Control