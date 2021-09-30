import {
  Actions, StopExcludeAction, StartExcludeAction, SetGameAction,
} from '../types/actions-types';
import {
  IUserInfo, IStore, ISettings,
} from '../types/store-types';
import { initialStore } from './initialStore';

export type AllActions =
  { type: typeof Actions.UPDATE_SETTINGS; payload: ISettings }
  | { type: typeof Actions.UPDATE_USERINFO; payload: IUserInfo }
  | { type: typeof Actions.SET_DEFAULT_SETTINGS }
  | StopExcludeAction | StartExcludeAction | SetGameAction;

export default function reducer(state: IStore = initialStore, action: AllActions) {
  switch (action.type) {
    case Actions.UPDATE_USERINFO:
      return { ...state, user: { ...action.payload } };
    case Actions.UPDATE_SETTINGS:
      return { ...state, game: { ...state.game, settings: { ...state.game.settings, ...action.payload } } };
    case Actions.SET_GAME:
      return { ...state, game: { ...state.game, ...action.payload } };
    case Actions.START_EXCLUDE:
      return { ...state, game: { ...state.game, excluding: { ...action.payload } } };
    case Actions.STOP_EXCLUDE:
      return { ...state, game: { ...state.game, excluding: { isActive: false } } };
    case Actions.SET_DEFAULT_SETTINGS:
      return { ...state, game: initialStore.game };
    default:
      return state;
  }
}
