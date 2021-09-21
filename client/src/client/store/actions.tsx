import {
  Actions, IKeyIdGameAction,  SettingsActions, UserUpdateAction,
} from './types/actions-types';
import { IIdKeyUser, ISettings, IUserInfo } from './types/store-types';

export function UpdateUser(payload: any): any {
  return {
    type: Actions.UPDATE_USERINFO,
    payload,
  };
}

export function UpdateSettings(payload: ISettings): SettingsActions {
  return {
    type: Actions.UPDATE_SETTINGS,
    payload,
  };
}



export const KeyGameIdActions = (payload: IIdKeyUser):IKeyIdGameAction => 
({ type: Actions.UPDATE_KEY_GAME, payload });
