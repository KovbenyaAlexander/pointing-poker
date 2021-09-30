import { ISettings, IStore, IUserInfo } from '../types/store-types';

const user: IUserInfo = { name: '', role: '', userID: '' };
const settings: ISettings = {
  gameName: '',
  isDealerInGame: false,
  isAutoEntry: false,
  isAutoFinish: false,
  isVoteMutable: false,
  estimationType: 'power2',
  isTimerRequired: false,
  timerValue: '01:01',
};

export const initialStore: IStore = {
  user,
  game: {
    members: [],
    excluding: {
      isActive: false,
    },
    settings,
    isActive: false,
    id: null,
  },
};
