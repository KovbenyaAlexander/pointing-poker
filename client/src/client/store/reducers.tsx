import {
  Actions, AllActions,
} from '../types/actions-types';
import { ISettings, IStore, IUserInfo } from '../types/store-types';

const user: IUserInfo = { name: 'Alex' };
const settings: ISettings = { time: 30 };
const initialStore: IStore = {
  user: user,
  settings: settings,
};

export default function reducer(state: IStore = initialStore, action: AllActions) {
  switch (action.type) {
    case Actions.UPDATE_USERINFO:
      return { ...state, user: { ...action.payload } };
    case Actions.UPDATE_SETTINGS:
      return { ...state, settings: { ...action.payload } };
    default:
      return state;
  }
}
