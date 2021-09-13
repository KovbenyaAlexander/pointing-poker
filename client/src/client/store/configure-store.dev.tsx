import { compose, createStore, Store } from 'redux';
import DevTools from './devtools';
import { middleware } from './middleware';
import { reducer } from './reducers';
import { SettingsActions, UserActions } from './types/actions-types';
import { IStore } from './types/store-types';

const enhancer = compose(
  middleware,
  DevTools.instrument(),
);

export default function configureStoreDev(): Store<IStore, UserActions | SettingsActions> {
  const store = createStore(reducer, enhancer);

  return store;
}
