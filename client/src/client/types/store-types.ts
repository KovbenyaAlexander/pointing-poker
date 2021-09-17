export interface IUserInfo {
  name: string;
  userID: string;
  role: string;
  imgSrc?: string;
}

export interface ISettings {
  time: number;
}

export interface IGame {
  gameID: string | undefined;
  members: IUserInfo[];
}

export interface IStore {
  user: IUserInfo;
  settings: ISettings;
  game: IGame;
}
