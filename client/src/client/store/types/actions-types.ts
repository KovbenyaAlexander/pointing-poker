import { IDataUser, ISettings, IUserInfo } from './store-types';

export enum Actions {
  UPDATE_USERINFO = 'UPDATE_USERINFO',
  UPDATE_SETTINGS = 'UPDATE_SETTINGS',
  ADDED_DATA_USER = 'ADDED_DATA_USER',
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

export type SettingsActions = SettingUpdateAction;

// data user

export interface IDataUserUpdateAction{
  type: Actions.ADDED_DATA_USER;
  payload: IDataUser
}

export type IDataUserAction = IDataUserUpdateAction;
