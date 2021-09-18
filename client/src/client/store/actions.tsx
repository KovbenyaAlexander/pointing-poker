import { Actions } from '../types/actions-types';
import { ISettings, IUserInfo, IGame } from '../types/store-types';
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

export function UpdateGameInfo(payload: IGame): AllActions {
  return {
    type: Actions.UPDATE_GAMEINFO,
    payload,
  };
}

export function setInitialStore(): AllActions {
  return {
    type: Actions.SET_INITIAL_STORE,
  };
}
