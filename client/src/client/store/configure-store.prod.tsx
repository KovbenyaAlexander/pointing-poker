import { createStore } from 'redux';
import { middleware } from './middleware';
import { reducer } from './reducers';
import { StoreType } from './types/middleware-types';

export default function configureStoreProd(): StoreType {
  return createStore(reducer, middleware);
}
