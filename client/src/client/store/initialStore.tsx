import { ISettings, IStore, IUserInfo } from '../types/store-types';

export const user:IUserInfo = {
  name: '',
  lastName: '',
  jobPosition: '',
  photoUser: '',
  role: '',

};

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
    settings,
    isActive: false,
    id: null,
  },
};
