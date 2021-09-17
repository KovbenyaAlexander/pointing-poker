import { IGame, ISettings, IUserInfo } from './store-types';

export enum Actions {
  UPDATE_USERINFO = 'UPDATE_USERINFO',
  UPDATE_SETTINGS = 'UPDATE_SETTINGS',
  SET_GAME = 'SET_GAME',
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

// Game Actions
export interface SetGameAction {
  type: Actions.SET_GAME;
  payload: IGame;
}

export type GameActions = SetGameAction;

export type AllActions = SettingsActions | UserActions | GameActions;
