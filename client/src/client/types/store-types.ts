export interface IUserInfo {
  name: string;
}

export interface ISettings {
  isActive?: boolean | null;
  gameName?: string;
  isDealerInGame?: boolean;
  isAutoEntry?: boolean;
  isAutoFinish?: boolean;
  isVoteMutable?: boolean;
  estimationType?: string;
  isTimerRequired?: boolean;
  timerValue?: string;
}

export interface IGame {
  id?: string | null;
  isActive?: boolean;
  settings?: ISettings;
}

export interface IStore {
  user: IUserInfo;
  game: {
    id: string | null;
    isActive: boolean;
    settings: ISettings;
  }
}
