import { Actions, AllActions } from '../types/actions-types';
import { IStore } from '../types/store-types';
import { initialStore } from './initialStore';

export default function reducer(state: IStore = initialStore, action: AllActions) {
  switch (action.type) {
    case Actions.UPDATE_USERINFO:
      return { ...state, user: { ...action.payload } };
    case Actions.UPDATE_SETTINGS:
      return { ...state, game: { ...state.game, settings: { ...action.payload } } };
    case Actions.UPDATE_GAMEINFO:
      return { ...state, game: { ...state.game, ...action.payload } };
    default:
      return state;
  }
}
