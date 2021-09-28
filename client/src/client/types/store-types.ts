export interface IUserInfo {
  name: string
  lastName?: string
  jobPosition?: string
  photoUser?: string
  role?: string
}

interface IStory{
  name: string,
  description: string,
  id: string
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
  stories: Array<IStory>
}

export interface IStore {
  user: IUserInfo;
  game: {
    id: string | null;
    isActive: boolean;
    settings: ISettings;
  }
}
