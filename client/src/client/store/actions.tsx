import {
  Actions, SetGameAction, SettingsActions, StartExcludeAction, StopExcludeAction, UserUpdateAction,
} from '../types/actions-types';
import {
  IExclude, IGame, ISettings, IUserInfo,
} from '../types/store-types';

export function UpdateUser(payload: IUserInfo): UserUpdateAction {
  return {
    type: Actions.UPDATE_USERINFO,
    payload,
  };
}

export function UpdateSettings(payload: ISettings): SettingsActions {
  return {
    type: Actions.UPDATE_SETTINGS,
    payload,
  };
}

export function SetGame(payload: IGame): SetGameAction {
  return {
    type: Actions.SET_GAME,
    payload,
  };
}

export function StartExclude(payload: IExclude): StartExcludeAction {
  return {
    type: Actions.START_EXCLUDE,
    payload,
  };
}

export function StopExlude(payload: 'yes' | 'no'): StopExcludeAction {
  return {
    type: Actions.STOP_EXCLUDE,
  };
}
