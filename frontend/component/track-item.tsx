import React from 'react';
import { Card, Grid, IconButton } from '@mui/material';
import { ITrack } from '../types/track.interface';
import styles from './track-item.module.scss';
import { Delete, Pause, PlayArrow } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { useTypedSelector } from '../hooks/use-typed-selector';
import { useActions } from '../hooks/use-actions';

interface TProps {
  track: ITrack;
}
export const TrackItem: React.FC<TProps> = ({ track }) => {
  const router = useRouter();

  const { pause, active } = useTypedSelector(state => state.player);

  const { setPlay, setPause, setActive } = useActions();

  const clickPlay = (e: React.SyntheticEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (active !== track) {
      setActive(track);
      setPlay();
      return;
    }

    if (pause) {
      setPlay();
    } else {
      setPause();
    }
  }

  return (
    <Card className={styles.track} onClick={() => router.push(`/tracks/${track._id}`)}>
      <IconButton onClick={clickPlay}>
        {(!pause && active === track) ?<Pause/> : <PlayArrow/>}
      </IconButton>
      <div
        className={styles.picture}
        style={{ backgroundImage: track.picture ? `url(http://localhost:5000/${track.picture})` : 'none' }}
      />
      <Grid flexGrow={1} className={styles.mainInfo} container direction="column">
        <div>{track.name}</div>
        <div className={styles.artist}>{track.artist}</div>
      </Grid>
      {active && `4.59 / 2.30`}
      <IconButton className={styles.duration}>
        <Delete />
      </IconButton>
    </Card>
  );
};
