import { ISettings, IUserInfo } from './store-types';

export enum Actions {
  UPDATE_USERINFO = 'UPDATE_USERINFO',
  UPDATE_SETTINGS = 'UPDATE_SETTINGS',
  UPDATE_GAMEINFO = 'UPDATE_GAMEINFO',
}

// User Actions
export interface UserUpdateAction {
  payload: IUserInfo;
  type: Actions.UPDATE_USERINFO;
}

export type UserActions = UserUpdateAction;

// Settings Actions
export interface SettingUpdateAction {
  payload: ISettings;
  type: Actions.UPDATE_SETTINGS
}
export interface GameInfoUpdateAction {
  payload: any;
  type: Actions.UPDATE_GAMEINFO
}

export type SettingsActions = SettingUpdateAction | GameInfoUpdateAction;

export type AllActions = SettingsActions | UserActions;
