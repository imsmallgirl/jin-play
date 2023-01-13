import classNames from 'classnames';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const getDuration = (src) => {
  return new Promise((resolve) => {
    const audio = new Audio();
    audio.onloadedmetadata = () => {
      const minutes = `0${parseInt(audio.duration/60, 10)}`
      const seconds = `0${parseInt(audio.duration%60)}`
      resolve(`${minutes}:${seconds.slice(-2)}`)
    }
    audio.src = src
  })
}

function PlayListItem({index , item}) {

  const { currentIndex } = useSelector(state => ({currentIndex : state.currentIndex}))
  const [duration, setDuration] = useState("00:00")
  useEffect(() => {
    async function getTime(){
      const durationTime = await getDuration(item.src)
      setDuration(durationTime)
    }

    getTime()
  }, [item.src])


  return (
    <div className={classNames('play-list-item', {playing:currentIndex === index})}>
      <div>
        <img src={item.img} alt={item.title} />
        <dl>
            <dt>{item.title}</dt>
            <dd>{item.artist}</dd>
        </dl>
      </div>
      <p>{duration}</p>
        
    </div>
  )
}

export default PlayListItem 
