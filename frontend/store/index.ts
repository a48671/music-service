import { Context, createWrapper } from 'next-redux-wrapper';
import { AnyAction, configureStore, ThunkDispatch } from '@reduxjs/toolkit';
import { Store } from 'redux';
import { reducer, TCommonState } from './reducers';
import thunk from 'redux-thunk';
import { TPlayerAction } from '../types/player.types';
import { TTracksAction } from '../types/track.interface';


const makeStore = (context: Context) => configureStore<TCommonState>({
  reducer,
  middleware: [thunk]
});


export const wrapper = createWrapper<Store<TCommonState, TPlayerAction | TTracksAction>>(makeStore, { debug: true });

export type TNextThunkDispatch = ThunkDispatch<TCommonState, void, AnyAction>
