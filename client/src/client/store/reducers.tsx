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
  switch (action.type) {
    case Actions.UPDATE_USERINFO:
      return { ...state, user: { ...action.payload } };
    case Actions.UPDATE_SETTINGS:
      return { ...state, settings: { ...action.payload } };
    default:
      return state;
  }
}
