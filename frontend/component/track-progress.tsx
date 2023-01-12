import React, { SyntheticEvent } from 'react';
import styles from './track-progress.module.scss'

interface ITrackProgressProps {
  value: number;
  right: number;
  onChange: (e: SyntheticEvent<HTMLInputElement>) => void;
}

export const TrackProgress = ({ right, value, onChange }: ITrackProgressProps): JSX.Element => {
  return (
    <div className={styles.trackProgress}>
      <input className={styles.input} type="range" min={0} max={right} value={value} onChange={onChange} />
      <div className={styles.time}>{value} / {right}</div>
    </div>
  );
};
