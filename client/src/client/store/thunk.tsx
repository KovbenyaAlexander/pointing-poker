import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import axios from 'axios';
import { IStore } from './types/store-types';
import { UpdateId } from './actions';

const url = 'http://localhost:5000/api/';

export function newGame() {
  return async (dispatch: ThunkDispatch<void, IStore, AnyAction>, getState: ()=>IStore): Promise<void> => {
    try {
      const { user } = getState();
      const response = await axios.post(`${url}newGame`, { userName: user.name });
      if (response.status === 200) {
        dispatch(UpdateId(response.data));
      }
    } catch (e) {
      console.log(e);
    }
  };
}
