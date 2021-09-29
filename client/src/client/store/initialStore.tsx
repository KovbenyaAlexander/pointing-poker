import { ISettings, IStore, IUserInfo } from '../types/store-types';

export const user:IUserInfo = {
  name: 'USERNAME',
  lastName: 'adasdd',
  jobPosition: '',
  photoUser: '',
  role: '',
};

const settings: ISettings = {
  gameName: 'GAME__NAME',
  isDealerInGame: false,
  isAutoEntry: false,
  isAutoFinish: false,
  isVoteMutable: false,
  estimationType: 'power2',
  isTimerRequired: false,
  timerValue: '01:01',
  stories: [{
    name: 'sdfdsf',
    description: 'sdfdsf',
    id: 'sdfdsf',
  }],
};

export const initialStore: IStore = {
  user,
  game: {
    settings,
    isActive: false,
    id: null,
  },
};
