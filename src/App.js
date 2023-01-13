import Control from "./components/controls/Control";
import PlayList from "./components/playList/PlayList";
import ProgressBar from "./components/progressbar/ProgressBar";
import SongDetail from "./components/song-detail/SongDetail";
import './App.scss'
import Header from "./components/header/Header";
import { useCallback, useRef, useState } from "react";

function App() {

  const audioRef = useRef()

  const onPlay = useCallback(() => {
    audioRef.current.play()
  }, [])

  const onPause = useCallback(() => {
    audioRef.current.pause()
  }, [])

  const changeVolume = useCallback((volume) => {
    audioRef.current.changeVolume(volume)
  }, [])

  const resetMusic = useCallback(() => {
    audioRef.current.resetCurrentTime()
  },[])

  const [showing, setShowing] = useState(false)

  return (
    <div className="App">
      <div className="container">
          <Header setShowing={setShowing}/>
          <SongDetail />
          <ProgressBar ref={audioRef}/>
          <Control onPlay={onPlay} onPause={onPause} changeVolume={changeVolume} resetMusic={resetMusic}/>
      </div>
      <PlayList showing={showing} setShowing={setShowing}/>
    </div>
  );
}

export default App;
