import { compose, createStore } from 'redux';
import DevTools from './devtools';
import { middleware } from './middleware';
import { reducer } from './reducers';
import { StoreType } from './types/middleware-types';

const enhancer = compose(
  middleware,
  DevTools.instrument(),
);

export default function configureStoreDev(): StoreType {
  const store = createStore(reducer, enhancer);

  return store;
}
