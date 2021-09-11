export interface IUserInfo {
  name: string;
}

export interface ISettings {
  time: number;
}

export interface IStore {
  user: IUserInfo;
  settings: ISettings;
}
