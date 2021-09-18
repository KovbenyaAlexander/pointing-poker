import {
  Actions, SettingsActions, UserUpdateAction, GameInfoUpdateAction,
} from '../types/actions-types';
import { ISettings, IUserInfo } from '../types/store-types';

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

export function UpdateGameInfo(payload: any): GameInfoUpdateAction {
  return {
    type: Actions.UPDATE_GAMEINFO,
    payload,
  };
}
