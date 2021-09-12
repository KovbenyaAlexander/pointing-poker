import { combineReducers } from 'redux';
import { Actions, SettingsActions, UserActions } from './types/actions-types';
import { ISettings, IUserInfo } from './types/store-types';

const mockUser: IUserInfo = { name: 'Alex' };
const settings: ISettings = { time: 30, id: null, isActive: false };

function userDataReducer(state: IUserInfo = mockUser, action: UserActions) {
  switch (action.type) {
    case Actions.UPDATE_USERINFO:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

function settingsDataReducer(state: ISettings = settings, action: SettingsActions) {
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
});
