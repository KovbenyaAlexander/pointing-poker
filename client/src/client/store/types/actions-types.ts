import { IUserInfo } from './store-types';

export enum Actions {
  UPDATE_USERINFO = 'UPDATE_USERINFO',
}

export interface UserUpdateAction {
  payload: IUserInfo;
  type: Actions.UPDATE_USERINFO;
}

export type UserActions = UserUpdateAction;
