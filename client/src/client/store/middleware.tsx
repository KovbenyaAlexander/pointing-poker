import { applyMiddleware } from 'redux';
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { UpdateUser } from './actions';
import { SettingsActions, UserActions } from './types/actions-types';
import { IStore } from './types/store-types';

export function exampleMiddleware(): ThunkAction<void, IStore, unknown, UserActions | SettingsActions> {
  return (dispatch: ThunkDispatch<IStore, unknown, UserActions | SettingsActions>) => {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        dispatch(UpdateUser({ name: 'Panda' }));
        resolve(1);
      }, 2000);
    });
  };
}

export const middleware = applyMiddleware(thunk);
