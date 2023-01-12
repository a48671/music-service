import { EnumTracksActionTypes, ITrack, ITracksState, TTracksAction } from '../../types/track.interface';

const initialState: ITracksState = {
  tracks: [],
  error: ''
}

export function tracksReducer(state = initialState, action: TTracksAction): ITracksState {
  switch (action.type) {
    case EnumTracksActionTypes.SET_FETCH_TRACKS:
      return ({
        error: '',
        tracks: action.payload
      });

    case EnumTracksActionTypes.SET_FETCH_TRACKS_ERROR:
      return ({
        ...state,
        error: action.payload
      });

    default:
      return state;
  }
}
