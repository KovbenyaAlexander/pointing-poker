import { Actions, UserUpdateAction } from './types/actions-types';
import { IUserInfo } from './types/store-types';

export function UpdateUser(payload: IUserInfo): UserUpdateAction {
  return {
    type: Actions.UPDATE_USERINFO,
    payload,
  };
}
