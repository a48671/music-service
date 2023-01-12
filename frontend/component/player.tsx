import React, { useEffect } from 'react';
import styles from './player.module.scss';
import { Grid, IconButton } from '@mui/material';
import { Pause, PlayArrow } from '@mui/icons-material';
import { TrackProgress } from './track-progress';
import { Volume } from './volume';
import { useTypedSelector } from '../hooks/use-typed-selector';
import { useActions } from '../hooks/use-actions';

let audio: InstanceType<typeof Audio>;

export const Player = (): JSX.Element => {
  const { pause, volume, duration, currentTime, active } = useTypedSelector(state => state.player);

  const { setPlay, setPause, setVolume, setCurrentTime, setDuration } = useActions();

  const play = () => {
    if (pause) {
      setPlay();
    } else {
      setPause();
    }
  }

  const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    audio.volume = Number(e.target.value) / 100
    setVolume(Number(e.target.value));
  }

  const changeCurrentTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    audio.currentTime = Number(e.target.value)
  }

  const setAudio = () => {
    if (!active || !active?.audio) return;

    audio.src = 'http://localhost:5000/' + active.audio;
    audio.volume = volume / 100;
    audio.onloadedmetadata = () => {
      setDuration(Math.ceil(audio.duration));
    }
    audio.ontimeupdate = () => {
      setCurrentTime(Math.ceil(audio.currentTime));
    }
    audio.onload = play;
  }

  useEffect(() => {
    if (!audio) {
      audio = new Audio();
    } else {
      setAudio();
    }
  }, [active]);

  useEffect(() => {
    if (!audio) return;

    if (pause) {
      audio.pause();
    } else {
      audio.play();
    }
  }, [pause]);

  if (!active) return null;

  return (
    <div className={styles.player}>
      <IconButton onClick={play}>
        {pause ? <PlayArrow/> : <Pause/>}
      </IconButton>
      <Grid className={styles.info} container direction="column">
        <div>{active.name}</div>
        <div className={styles.artist}>{active.artist}</div>
      </Grid>
      <TrackProgress right={duration} value={currentTime} onChange={changeCurrentTime} />
      <Volume value={volume} onChange={changeVolume} />
    </div>
  );
};

