import {
  IExclude, IGame, ISettings, IUserInfo,
} from './store-types';

export enum Actions {
  UPDATE_USERINFO = 'UPDATE_USERINFO',
  UPDATE_SETTINGS = 'UPDATE_SETTINGS',
  SET_GAME = 'SET_GAME',
  START_EXCLUDE = 'START_EXCLUDE',
  STOP_EXCLUDE = 'STOP_EXCLUDE',
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

export interface StartExcludeAction {
  type: Actions.START_EXCLUDE;
  payload: IExclude;
}

export interface StopExcludeAction {
  type: Actions.STOP_EXCLUDE;
  payload: boolean
}

export type GameActions = SetGameAction | StartExcludeAction | StopExcludeAction;

export type AllActions = SettingsActions | UserActions | GameActions;
