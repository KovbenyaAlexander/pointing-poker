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

export interface IDataUser {

  firstName: string
  lastName?: string
  jobPosition?: string
  photoUser?: string | ArrayBuffer | null | undefined

}
