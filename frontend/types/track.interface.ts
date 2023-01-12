import { IComment } from './comment.interface';

export interface ITrack {
  _id: string;
  name: string;
  text: string;
  artist: string;
  comments: Array<IComment>;
  audio: string;
  picture: string;
}

export interface ITracksState {
  tracks: Array<ITrack>;
  error: string;
}

export enum EnumTracksActionTypes {
  SET_FETCH_TRACKS = 'SET_FETCH_TRACKS',
  SET_FETCH_TRACKS_ERROR = 'SET_FETCH_TRACKS_ERROR'
}

export interface IFetchTracksAction {
  type: EnumTracksActionTypes.SET_FETCH_TRACKS,
  payload: Array<ITrack>;
}

export interface IFetchTracksErrorAction {
  type: EnumTracksActionTypes.SET_FETCH_TRACKS_ERROR,
  payload: string;
}

export type TTracksAction = IFetchTracksAction | IFetchTracksErrorAction;
