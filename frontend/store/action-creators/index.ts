import { PlayerActionTypesEnum, TPlayerAction } from '../../types/player.types';
import { EnumTracksActionTypes, ITrack, TTracksAction } from '../../types/track.interface';
import { Dispatch } from 'redux';
import axios from 'axios';

function setPlay(): TPlayerAction {
  return ({ type: PlayerActionTypesEnum.PLAY });
}

function setPause(): TPlayerAction {
  return ({ type: PlayerActionTypesEnum.PAUSE });
}

function setDuration(duration: number): TPlayerAction {
  return ({ type: PlayerActionTypesEnum.SET_DURATION, payload: duration });
}

function setActive(track: ITrack): TPlayerAction {
  return ({ type: PlayerActionTypesEnum.SET_ACTIVE, payload: track });
}

function setCurrentTime(time: number): TPlayerAction {
  return ({ type: PlayerActionTypesEnum.SET_CURRENT_TIME, payload: time });
}

function setVolume(volume: number): TPlayerAction {
  return ({ type: PlayerActionTypesEnum.SET_VOLUME, payload: volume });
}

function fetchTracks(): (dispatch: Dispatch<TTracksAction>) => Promise<void> {
  return async function (dispatch: Dispatch<TTracksAction>) {
    try {
      const response = await axios.get('http://localhost:5000/api/track/get-all');

      dispatch({ type: EnumTracksActionTypes.SET_FETCH_TRACKS, payload: response.data });
    } catch (e) {
      console.error(e);

      dispatch({
        type: EnumTracksActionTypes.SET_FETCH_TRACKS_ERROR,
        payload: "Couldn't get tracks"
      })
    }
  }
}

export const actionCreators = {
  setPlay,
  setPause,
  setDuration,
  setActive,
  setCurrentTime,
  setVolume,
  fetchTracks
}
