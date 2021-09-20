export enum Actions {
  UPDATE_USERINFO = 'UPDATE_USERINFO',
  UPDATE_SETTINGS = 'UPDATE_SETTINGS',
  SET_DEFAULT_SETTINGS = 'SET_DEFAULT_SETTINGS',
}

export interface IGame {
  id?: string | null;
  isActive?: boolean;
  settings?: {
    gameName: string;
    isDealerInGame: boolean;
    isAutoEntry: boolean;
    isAutoFinish: boolean;
    isVoteMutable: boolean;
    estimationType: string;
    isTimerRequired: boolean;
    timerValue: string;
  }
}
