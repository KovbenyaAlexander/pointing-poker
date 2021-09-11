export interface IUserInfo {
  name: string;
}

export interface ISettings {
  time: number;
  id: string | null
}

export interface IStore {
  user: IUserInfo;
  settings: ISettings;
}
