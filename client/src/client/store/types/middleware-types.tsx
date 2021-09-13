import { Store } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AllActions } from './actions-types';
import { IStore } from './store-types';

export type ThunkActionCustom = ThunkAction<void, IStore, unknown, AllActions>;
export type ThunkDispatchCustom = ThunkDispatch<IStore, unknown, AllActions>;
export type StoreType = Store<IStore, AllActions>;
