import { IPlayerState, PlayerActionTypesEnum, TPlayerAction } from '../../types/player.types';

const initialState: IPlayerState = {
  active: null,
  currentTime: 0,
  duration: 0,
  pause: true,
  volume: 50
}

export function playerReducer(state: IPlayerState = initialState, action: TPlayerAction): IPlayerState {
  switch (action.type) {
    case PlayerActionTypesEnum.SET_CURRENT_TIME:
      return ({ ...state, currentTime: action.payload });

    case PlayerActionTypesEnum.SET_DURATION:
      return ({ ...state, duration: action.payload });

    case PlayerActionTypesEnum.SET_ACTIVE:
      return ({ ...state, active: action.payload, duration: 0, currentTime: 0 });

    case PlayerActionTypesEnum.PAUSE:
      return ({ ...state, pause: true });

    case PlayerActionTypesEnum.PLAY:
      return ({ ...state, pause: false });

    case PlayerActionTypesEnum.SET_VOLUME:
      return ({ ...state, volume: action.payload });

    default:
      return state;
  }
}
