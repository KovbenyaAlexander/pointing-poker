import { combineReducers } from 'redux';
import { Actions, SettingsActions, UserActions } from './types/actions-types';
import {  DataUserReducer } from './types/data-user-reducer.ts/data-user';
import { ISettings, IUserInfo } from './types/store-types';

const mockUser: IUserInfo = { name: 'Alex' };
const mockSettings: ISettings = { time: 30 };

function userDataReducer(state: IUserInfo = mockUser, action: UserActions) {
  switch (action.type) {
    case Actions.UPDATE_USERINFO:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

function settingsDataReducer(state: ISettings = mockSettings, action: SettingsActions) {
  switch (action.type) {
    case Actions.UPDATE_SETTINGS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

export const reducer = combineReducers({
  user: userDataReducer,
  settings: settingsDataReducer,
  dataUser: DataUserReducer 
});
