import React, { SyntheticEvent } from 'react';
import styles from './volume.module.scss'
import { VolumeUp } from '@mui/icons-material';

interface ITrackProgressProps {
  value: number;
  onChange: (e: SyntheticEvent<HTMLInputElement>) => void;
}

export const Volume = ({ value, onChange }: ITrackProgressProps): JSX.Element => {
  return (
    <div className={styles.volume}>
      <VolumeUp className={styles.icon} />
      <input type="range" min={0} max={100} value={value} onChange={onChange} />
    </div>
  );
};
