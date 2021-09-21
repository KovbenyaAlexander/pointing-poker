import io from 'socket.io-client';
import { ISettings, IStore, IUserInfo } from '../types/store-types';

const socket = io('http://localhost:5000', {
  withCredentials: true,
});

const user: IUserInfo = { name: '' };
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
  socket,
};
