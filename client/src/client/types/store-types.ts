export interface IUserInfo {
  name: string;
  userID: string;
  role: string;
  imgSrc?: string;
}

export interface ISettings {
  time: number;
}

export interface IExclude {
  user?: IUserInfo;
  reason?: string;
  isActive: boolean;
}

export interface IGame {
  gameID: string | undefined;
  members: IUserInfo[];
  excluding: IExclude;
}

export interface IStore {
  user: IUserInfo;
  settings: ISettings;
  game: IGame;
}
