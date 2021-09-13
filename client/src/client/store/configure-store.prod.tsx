import { createStore, Store } from 'redux';
import { middleware } from './middleware';
import { reducer } from './reducers';
import { UserActions, SettingsActions } from './types/actions-types';
import { IStore } from './types/store-types';

export default function configureStoreProd(): Store<IStore, UserActions | SettingsActions> {
  return createStore(reducer, middleware);
}
