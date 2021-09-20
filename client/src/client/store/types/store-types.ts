export interface IUserInfo {
  firstName: string
  lastName: string
  jobPosition: string
  photoUser: string
  role: string
}

export interface ISettings {
  time: number;
}

export interface IStore {
  user: IUserInfo;
  settings: ISettings;
}


export interface IIdKeyUser{
  keyID: string
}

