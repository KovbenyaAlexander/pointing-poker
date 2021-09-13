import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { UpdateUser } from './actions';
import { ThunkActionCustom, ThunkDispatchCustom } from './types/middleware-types';

export function exampleMiddleware(): ThunkActionCustom {
  return (dispatch: ThunkDispatchCustom) => {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        dispatch(UpdateUser({ name: 'Panda' }));
        resolve(1);
      }, 5000);
    });
  };
}

export const middleware = applyMiddleware(thunk);
