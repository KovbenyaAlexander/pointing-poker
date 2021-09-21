import {
  IStore, IUserInfo,
} from '../types/store-types';
import { Actions, IGame } from '../types/actions-types';

import { initialStore } from './initialStore';

export type AllActions =
  { type: typeof Actions.UPDATE_SETTINGS; payload: IGame }
  | { type: typeof Actions.UPDATE_USERINFO; payload: IUserInfo }
  | { type: typeof Actions.SET_DEFAULT_SETTINGS };

export default function reducer(state: IStore = initialStore, action: AllActions) {
  switch (action.type) {
    case Actions.UPDATE_USERINFO:
      return { ...state, user: { ...action.payload } };
    case Actions.UPDATE_SETTINGS:
      return { ...state, game: { ...state.game, ...action.payload } };
    case Actions.SET_DEFAULT_SETTINGS:
      return { ...state, game: initialStore.game };
    default:
      return state;
  }
}
