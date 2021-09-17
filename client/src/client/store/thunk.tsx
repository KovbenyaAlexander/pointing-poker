import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import axios from 'axios';
import { IStore } from '../types/store-types';
import { UpdateSettings } from './actions';
import { SettingsType } from '../components/settings/settings';

const url = 'http://localhost:5000/api/';

export function createGame(settings: SettingsType) {
  return async (dispatch: ThunkDispatch<void, IStore, AnyAction>, getState: ()=>IStore): Promise<void> => {
    try {
      const { user } = getState();
      const response = await axios.post(`${url}newGame`, { userName: user.name, settings });
      if (response.status === 200) {
        console.log(response);
        dispatch(UpdateSettings({ ...response.data }));
      }
    } catch (e) {
      console.log(e);
    }
  };
}

export function cancelGame() {
  return async (dispatch: ThunkDispatch<void, IStore, AnyAction>, getState: ()=>IStore): Promise<void> => {
    try {
      const { settings } = getState();
      const response = await axios.post(`${url}/removeGame`, { id: settings.id });
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
      const state = getState();
      const response = await axios.post(`${url}/activateGame`, { id: state.settings.id });
      if (response.status === 200) {
        dispatch(UpdateSettings(response.data));
      }
    } catch (e) {
      console.log(e);
    }
  };
}
