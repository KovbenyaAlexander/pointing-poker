import { ISettings, IUserInfo } from './store-types';

export enum Actions {
  UPDATE_USERINFO = 'UPDATE_USERINFO',
  UPDATE_SETTINGS = 'UPDATE_SETTINGS',
  UPDATE_KEY_GAME = 'UPDATE_KEY_GAME',
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

export interface IKeyGameIdUpdateAction{
  type: Actions.UPDATE_KEY_GAME;
  payload: any
}

export type IKeyIdGameAction = IKeyGameIdUpdateAction;
