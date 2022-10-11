import React, { useEffect } from "react";
import { IconButton, Grid } from "@mui/material";
import { PlayArrow, Pause, VolumeUp } from "@mui/icons-material";
import styles from "./../styles/Player.module.scss";
import { ITrack } from "../types/ITrack";
import TrackProgressBar from "./TrackProgressBar";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useActions } from "../hooks/useAction";

let audio;

const Player = () => {
  
  const { pauseTrack, playTrack, setVolume, setActiveTrack, setCurrentTime, setDuration } = useActions();
  const { pause, active, volume, duration, currentTime } = useTypedSelector(state => state.player);
  
  const play = () => {
    if(pause) {
        playTrack();
        audio.play();
    } else {
        pauseTrack();
        audio.pause();
    }
  }

  useEffect(
    () => {
      if(!audio) {
        audio = new Audio();
      } else {
        setAudio();
        play();
      }
    },
    [active]
  );

  const setAudio = () => {
    if(active) {
      audio.src = `http://localhost:5000/${active.audio}`;
      audio.volume = volume / 100;
      audio.onloadedmetadata = () => {
        setDuration(Math.ceil(audio.duration));
      };
      audio.ontimeupdate = () => {
        setCurrentTime(Math.ceil(audio.currentTime));
      };
    }
  }
  
  const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    audio.volume = Number(e.target.value) / 100;
    setVolume(Number(e.target.value));
  }

  const changeCurrentTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    audio.currentTime = Number(e.target.value);
    setCurrentTime(Number(e.target.value));
  }

  if(!active) { return null; }

  return (
    <div className={styles.player}>
      <div className={styles.block}>
        <IconButton onClick={ play }>
          {pause
            ? <PlayArrow style={{color:"blue"}} />
            : <Pause style={{color:"blue"}} />
          }
        </IconButton>
        <Grid container direction={"column"}>
          <div>
            <span style={{fontSize:13}}><b>{active?.name}</b></span>
            <br/>
            <span style={{fontSize:12}}><i>{active?.artist}</i></span>
          </div>
        </Grid>
      </div>
      <div className={styles.block}>
        <TrackProgressBar left={currentTime} right={duration} onChange={ changeCurrentTime } isDurationBar={true} />
      </div>
      <div className={styles.block}>
        <VolumeUp style={{marginLeft:"auto", color:"blue"}} />
        <TrackProgressBar left={ volume } right={100} onChange={ changeVolume }  isDurationBar={false} />
      </div>
    </div>
  );
}
export default Player;
