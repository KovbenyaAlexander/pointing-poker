import {
  IStore, ISettings, IUserInfo, IGame,
} from '../types/store-types';
import { Actions } from '../types/actions-types';

import { initialStore } from './initialStore';

export type AllActions =
  { type: typeof Actions.UPDATE_SETTINGS; payload: ISettings }
  | { type: typeof Actions.UPDATE_USERINFO; payload: IUserInfo }
  | { type: typeof Actions.UPDATE_GAMEINFO; payload: IGame }
  | { type: typeof Actions.SET_INITIAL_STORE };

export default function reducer(state: IStore = initialStore, action: AllActions) {
  switch (action.type) {
    case Actions.UPDATE_USERINFO:
      return { ...state, user: { ...action.payload } };
    case Actions.UPDATE_SETTINGS:
      return { ...state, game: { ...state.game, settings: { ...action.payload } } };
    case Actions.UPDATE_GAMEINFO:
      return { ...state, game: { ...state.game, ...action.payload } };
    case Actions.SET_INITIAL_STORE:
      return initialStore;
    default:
      return state;
  }
}
