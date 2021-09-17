import {
  Actions, AllActions,
} from '../types/actions-types';
import {
  IGame, ISettings, IStore, IUserInfo,
} from '../types/store-types';

const mockUser: IUserInfo = { name: 'Alex', role: 'player', userID: '4' };
const mockSettings: ISettings = { time: 30 };
const mockGame: IGame = {
  gameID: '1e',
  members: [{
    userID: '1',
    name: 'Lucy',
    role: 'dealer',
  },
  {
    userID: '2',
    name: 'Ruby',
    role: 'player',
  },
  {
    userID: '33',
    name: 'Armani',
    role: 'player',
  },
  {
    name: 'Alex',
    role: 'player',
    userID: '4',
  },
  ],
};
const mockStore: IStore = {
  user: mockUser,
  settings: mockSettings,
  game: mockGame,
};

export default function reducer(state: IStore = mockStore, action: AllActions) {
  switch (action.type) {
    case Actions.UPDATE_USERINFO:
      return { ...state, user: { ...action.payload } };
    case Actions.UPDATE_SETTINGS:
      return { ...state, settings: { ...action.payload } };
    case Actions.SET_GAME:
      return { ...state, game: { ...action.payload } };
    default:
      return state;
  }
}
