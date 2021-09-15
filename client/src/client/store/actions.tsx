import {
  Actions, IDataUserAction, SettingsActions, UserUpdateAction,
} from './types/actions-types';
import { IDataUser, ISettings, IUserInfo } from './types/store-types';

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

export const DataUserActions = (payload: IDataUser):IDataUserAction => ({ type: Actions.ADDED_DATA_USER, payload });
