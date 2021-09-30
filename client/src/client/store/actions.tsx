import {
  IUserInfo, IGame, Actions, IExclude, SetGameAction, StartExcludeAction, StopExcludeAction, ISettings,
} from '../types';
import { AllActions } from './reducers';

export function UpdateUser(payload: IUserInfo): AllActions {
  return {
    type: Actions.UPDATE_USERINFO,
    payload,
  };
}

export function UpdateSettings(payload: ISettings): AllActions {
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

export function StopExlude(payload: boolean): StopExcludeAction {
  return {
    type: Actions.STOP_EXCLUDE,
    payload,
  };
}

export function setInitialStore(): AllActions {
  return {
    type: Actions.SET_DEFAULT_SETTINGS,
  };
}
