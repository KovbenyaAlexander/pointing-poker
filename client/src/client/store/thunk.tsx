import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import axios from 'axios';
import { IStore } from '../types/store-types';
import { UpdateSettings, UpdateGameInfo } from './actions';

export type SettingsType = {
  gameName: string,
  isDealerInGame: boolean,
  isAutoEntry: boolean,
  isAutoFinish: boolean,
  isVoteMutable: boolean,
  estimationType: string,
  isTimerRequired: boolean,
  timerValue: string,
};

const url = 'http://localhost:5000/api';

export function createGame(settings: SettingsType) {
  return async (dispatch: ThunkDispatch<void, IStore, AnyAction>, getState: ()=>IStore): Promise<void> => {
    try {
      const { user } = getState();
      const response = await axios.post(`${url}/newGame`, { userName: user.name, settings });
      if (response.status === 200) {
        console.log(response.data);
        dispatch(UpdateSettings({ ...response.data }));
        dispatch(UpdateGameInfo({ id: response.data.id, isActive: false }));
      }
    } catch (e) {
      console.log(e);
    }
  };
}

export function cancelGame() {
  return async (dispatch: ThunkDispatch<void, IStore, AnyAction>, getState: ()=>IStore): Promise<void> => {
    try {
      const { game } = getState();
      const response = await axios.post(`${url}/removeGame`, { id: game.settings.id });
      if (response.status === 200) {
        dispatch(UpdateSettings({ id: null }));
      }
    } catch (e) {
      console.log(e);
    }
  };
}

export function activateGame() {
  return async (dispatch: ThunkDispatch<void, IStore, AnyAction>, getState: ()=>IStore): Promise<void> => {
    try {
      const { game } = getState();
      const response = await axios.post(`${url}/activateGame`, { id: game.id });
      if (response.status === 200) {
        dispatch(UpdateGameInfo({isActive: true}));
      }
    } catch (e) {
      console.log(e);
    }
  };
}

export function updateSettings(settings: SettingsType) {
  return async (dispatch: ThunkDispatch<void, IStore, AnyAction>, getState: ()=>IStore): Promise<void> => {
    try {
      const { game } = getState();
      const response = await axios.post(`${url}/updateSettings`, {id: game.id, settings});
      if (response.status === 200) {
        dispatch(UpdateSettings(response.data));
      }
    } catch (e) {
      console.log(e);
    }
  };
}
