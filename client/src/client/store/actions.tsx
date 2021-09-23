import {
  IUserInfo, IGame, Actions,
} from '../types';
import { AllActions } from './reducers';

export function UpdateUser(payload: IUserInfo): AllActions {
  return {
    type: Actions.UPDATE_USERINFO,
    payload,
  };
}

export function UpdateSettings(payload: IGame): AllActions {
  return {
    type: Actions.UPDATE_SETTINGS,
    payload,
  };
}

export function setInitialStore(): AllActions {
  return {
    type: Actions.SET_DEFAULT_SETTINGS,
  };
}
