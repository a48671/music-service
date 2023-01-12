import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { TCommonState } from '../store/reducers';

export const useTypedSelector: TypedUseSelectorHook<TCommonState> = useSelector;
