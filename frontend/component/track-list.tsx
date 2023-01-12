import React from 'react';
import { ITrack } from '../types/track.interface';
import { TrackItem } from './track-item';

interface IProps {
  tracks: Array<ITrack>;
}

export const TrackList: React.FC<IProps> = ({ tracks }) => {
  return (
    <div>
      {tracks.map(t => <TrackItem key={t._id} track={t} />)}
    </div>
  );
};
