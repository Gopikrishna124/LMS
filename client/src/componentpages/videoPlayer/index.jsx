import React, { useCallback, useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useRef } from "react";
import { Slider } from "@/components/ui/slider";
import {
  ChevronsUpDown,
  Maximize,
  Minimize,
  PauseIcon,
  Play,
  RotateCcw,
  RotateCw,
  Volume2,
  VolumeX,
} from "lucide-react";
import { Button } from "@/components/ui/button";

function VideoPlayer({ width = "100%", height = "100%", url }) {
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [mute, setMute] = useState(false);
  const [played, setPlayed] = useState(0);
  const [seeking, setSeeking] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showControls, setShowControls] = useState(true);

  const playerRef = useRef(null);
  const playerContainerRef = useRef(null);
  const controlsTimeoutRef = useRef(null);

  function handlePlayAndPause() {
    setPlaying(!playing);
  }

  function handleProgress(state) {
    console.log("state", state);
    if (!seeking) {
      setPlayed(state.played);
    }
  }

  function handleRewind() {
    console.log("playerRef", playerRef);
    playerRef.current?.seekTo(playerRef.current.getCurrentTime() - 5);
  }

  function handleForward() {
    playerRef.current?.seekTo(playerRef.current.getCurrentTime() + 5);
  }

  function handleToggleMute() {
    setMute(!mute);
  }

  function handleSeekChange(newValue) {
    console.log("newValueChange", newValue);
    setPlayed(newValue[0]);
    setSeeking(true);
  }

  function handleSeekMouseUp() {
    //  setSeeking(false)
    playerRef.current?.seekTo(played);
  }

  function handleVolumeChange(newValue) {
    setVolume(newValue[0]);
  }

  function pad(string) {
    return ("0" + string).slice(-2);
  }

  function formatTime(seconds) {
    const date = new Date(seconds * 1000);
    const hh = date.getUTCHours();
    const mm = date.getUTCMinutes();
    const ss = pad(date.getUTCSeconds())

    if (hh) {
      return `${hh} : ${pad(mm)}: ${ss}`;
    }

    return `${mm} :${ss} `;
  }

  function handleMouseMove(){
    setShowControls(true)
    clearTimeout(controlsTimeoutRef.current)
    controlsTimeoutRef.current=setTimeout(()=>setShowControls(false),3000)
  }

  useEffect(()=>{
      const handleFullScreenChange=()=>{
        console.log('element',document.fullscreenElement)
        setIsFullScreen(document.fullscreenElement)
      }
      document.addEventListener('fullscreenchange',handleFullScreenChange)

      return ()=>{
        document.removeEventListener('fullscreenchange',handleFullScreenChange)
      }
  },[])

   const handleFullScreen=useCallback(()=>{
        if(!isFullScreen){
          if(playerContainerRef?.current.requestFullscreen){
            console.log('scren',playerContainerRef.current.requestFullscreen())
            playerContainerRef.current.requestFullscreen()
          }
        }
        else{
        if(document.exitFullscreen){
          document.exitFullscreen()
        }
        }
   },[isFullScreen])
  

  
  return (
    <div
      ref={playerContainerRef}
      className={`relative bg-gray-900 rounded-lg overflow-hidden shadow-2xl transition-all duration-300 ease-in-out
    ${isFullScreen ? "w-screen h-screen" : ""} `}
      style={{ width, height }}
      onMouseMove={handleMouseMove}
      onMouseLeave={()=>setShowControls(false)}
    >
      <ReactPlayer
        ref={playerRef}
        width="100%"
        height="100%"
        playing={playing}
        volume={volume}
        muted={mute}
        url={url}
        onProgress={handleProgress}
        
      />
      {showControls && (
        <div
          className={`absolute bottom-0 left-0 right-0 bg-gray-800  bg-opacity-75 p-4 transition-opacity duration-300
        ${showControls ? "opacity-100" : "opacity-0"} `}
        >
          <Slider
            value={[played * 100]}
            max={100}
            step={1}
            onValueChange={(value) => handleSeekChange([value[0] / 100])}
            onValueCommit={handleSeekMouseUp}
            className="w-full mb-4"
          />
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <Button
                variable="ghost"
                onClick={handlePlayAndPause}
                className="bg-transparent text-white hover:text-white hover:bg-gray-700 w-3 h-7"
              >
                {playing ? <PauseIcon /> : <Play />}
              </Button>

              <Button
                variable="ghost"
                onClick={handleRewind}
                className=" bg-transparent text-white hover:text-white hover:bg-gray-700 w-3 h-7"
              >
                <RotateCcw />
              </Button>

              <Button
                variable="ghost"
                onClick={handleForward}
                className="bg-transparent text-white hover:text-white hover:bg-gray-700 w-3 h-7"
              >
                <RotateCw />
              </Button>

              <Button
                variable="ghost"
                onClick={handleToggleMute}
                className="bg-transparent text-white hover:text-white hover:bg-gray-700 w-3 h-7"
              >
                {mute ? <VolumeX /> : <Volume2 />}
              </Button>

              <Slider
                value={[volume * 100]}
                max={100}
                step={1}
                onValueChange={(value) => handleVolumeChange([value[0] / 100])}
                className="w-24"
              />
            </div>

            <div className="flex items-center space-x-2">
              <div className="text-white">
               
                {formatTime( played * (playerRef?.current?.getDuration() || 0) )} / {""}
               {formatTime(playerRef.current?.getDuration() || 0)}
              </div>

              <Button
                variable="ghost"
                
                className="bg-transparent text-white hover:text-white hover:bg-gray-700 w-3 h-7"
                onClick={handleFullScreen}
             >
                {isFullScreen ? <Minimize/> : <Maximize/>}
              </Button>



            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default VideoPlayer;
