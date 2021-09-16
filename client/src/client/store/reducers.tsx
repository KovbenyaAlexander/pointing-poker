import {
  Actions, AllActions,
} from '../types/actions-types';
import { ISettings, IStore, IUserInfo } from '../types/store-types';

const mockUser: IUserInfo = { name: 'Alex' };
const mockSettings: ISettings = { time: 30 };
const mockStore: IStore = {
  user: mockUser,
  settings: mockSettings,
};

export default function reducer(state: IStore = mockStore, action: AllActions) {
  let { user } = state;
  let { settings } = state;
  switch (action.type) {
    case Actions.UPDATE_USERINFO:
      user = { ...user, ...action.payload };
      return { ...state, user };
    case Actions.UPDATE_SETTINGS:
      settings = { ...settings, ...action.payload };
      return { ...state, settings };
    default:
      return state;
  }
}
