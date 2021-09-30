import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import axios from 'axios';
import { IStore, IGame } from '../types';
import { setInitialStore, SetGame } from './actions';

const url = 'http://localhost:5000/api';

export function createGame(settings: IGame) {
  return async (
    dispatch: ThunkDispatch<void, IStore, AnyAction>,
    getState: () => IStore,
  ): Promise<void> => {
    try {
      const { user } = getState();
      const response = await axios.post(`${url}/newGame`, {
        userName: user.name,
        settings: { ...settings, members: [user] },
      });
      if (response.status === 200) {
        dispatch(SetGame({
          settings: response.data.settings,
          isActive: false,
          id: response.data.id,
          members: response.data.members,
          excluding: {
            isActive: false,
          },
        }));
      }
    } catch (e) {
      console.log(e);
    }
  };
}

export function cancelGame() {
  return async (
    dispatch: ThunkDispatch<void, IStore, AnyAction>,
    getState: () => IStore,
  ): Promise<void> => {
    try {
      const { game } = getState();
      const response = await axios.post(`${url}/removeGame`, { id: game.id });
      if (response.status === 200) {
        dispatch(setInitialStore());
      }
    } catch (e) {
      console.log(e);
    }
  };
}

export function activitySwitcher(isActive: boolean) {
  return async (
    dispatch: ThunkDispatch<void, IStore, AnyAction>,
    getState: () => IStore,
  ): Promise<void> => {
    try {
      const { game } = getState();
      const response = await axios.post(`${url}/changeGameActivity`, {
        id: game.id,
        isActive,
      });
      if (response.status === 200) {
        dispatch(SetGame({
          ...game,
          isActive: response.data,
        }));
      }
    } catch (e) {
      console.log(e);
    }
  };
}

export function updateSettings(settings: IGame) {
  return async (
    dispatch: ThunkDispatch<void, IStore, AnyAction>,
    getState: () => IStore,
  ): Promise<void> => {
    try {
      const { game } = getState();
      const response = await axios.post(`${url}/updateSettings`, {
        id: game.id,
        settings,
      });
      if (response.status === 200) {
        dispatch(SetGame(response.data));
      }
    } catch (e) {
      console.log(e);
    }
  };
}

export const isGameActive = (id: string) => (): Promise<void> => axios.post(`${url}/checkedIdKey`, { id })
  .then((res) => res.data)
  .catch((e) => console.log(e));
