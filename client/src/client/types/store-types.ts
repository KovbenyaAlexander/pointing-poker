export interface IUserInfo {
  name: string;
}

export interface ISettings {
  gameName: string;
  isDealerInGame: boolean;
  isAutoEntry: boolean;
  isAutoFinish: boolean;
  isVoteMutable: boolean;
  estimationType: string;
  isTimerRequired: boolean;
  timerValue: string;
}

export interface IStore {
  user: IUserInfo;
  game: {
    id: string | null;
    isActive: boolean;
    settings: ISettings;
  },
  socket: any
}
