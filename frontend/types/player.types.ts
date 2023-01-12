import { ITrack } from './track.interface';

export interface IPlayerState {
  active: null | ITrack;
  volume: number;
  duration: number;
  pause: boolean;
  currentTime: number;
}

export enum PlayerActionTypesEnum {
  PLAY = 'PLAY',
  PAUSE = 'PAUSE',
  SET_ACTIVE = 'SET_ACTIVE',
  SET_DURATION = 'SET_DURATION',
  SET_CURRENT_TIME = 'SET_CURRENT_TIME',
  SET_VOLUME = 'SET_VOLUME'
}

export interface IPlayAction {
  type: PlayerActionTypesEnum.PLAY
}

export interface IPauseAction {
  type: PlayerActionTypesEnum.PAUSE
}

export interface IActiveAction {
  type: PlayerActionTypesEnum.SET_ACTIVE,
  payload: ITrack
}

export interface IDurationAction {
  type: PlayerActionTypesEnum.SET_DURATION,
  payload: number
}

export interface ICurrentTimeAction {
  type: PlayerActionTypesEnum.SET_CURRENT_TIME,
  payload: number
}

export interface IVolumeAction {
  type: PlayerActionTypesEnum.SET_VOLUME,
  payload: number
}

export type TPlayerAction =
  IPlayAction |
  IPauseAction |
  IActiveAction |
  IDurationAction |
  ICurrentTimeAction |
  IVolumeAction;
