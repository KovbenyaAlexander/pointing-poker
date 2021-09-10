import { combineReducers } from 'redux';
import { Actions, UserActions } from './types/actions-types';
import { IUserInfo } from './types/store-types';

const mockState: IUserInfo = { name: 'Alex' };

function userDataReducer(state: IUserInfo = mockState, action: UserActions) {
  switch (action.type) {
    case Actions.UPDATE_USERINFO:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

export const reducer = combineReducers({ user: userDataReducer });
