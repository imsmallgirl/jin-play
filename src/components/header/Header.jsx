import React from 'react'
import './Header.scss'
import { TbPlaylist } from "react-icons/tb";

function Header({setShowing}) {

  const onClickPlayList = () => {
    setShowing(prev => !prev)
  }

  return (
    <div className='header-wrap'>
        <h1>JINPLAY</h1>
        <TbPlaylist style={{fontSize: "30px", cursor:"pointer"}} onClick={onClickPlayList}/>
    </div>
  )
}

export default Header