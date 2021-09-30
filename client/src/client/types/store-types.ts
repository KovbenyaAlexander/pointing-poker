export interface IUserInfo {
  name: string;
  userID: string;
  lastName?: string
  jobPosition?: string
  photoUser?: string
  role?: string
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

export interface IExclude {
  user?: IUserInfo;
  reason?: string;
  isActive: boolean;
}

export interface IGame {
  id?: string | null;
  isActive: boolean;
  members: IUserInfo[];
  excluding: IExclude;
  settings: ISettings;
}
export interface IStore {
  user: IUserInfo;
  game: IGame;
}
