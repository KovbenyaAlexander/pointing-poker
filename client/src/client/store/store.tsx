import { Store } from 'redux';
import configureStoreDev from './configure-store.dev';
import configureStoreProd from './configure-store.prod';
import { UserActions, SettingsActions } from './types/actions-types';
import { IStore } from './types/store-types';

let storeTemp: Store<IStore, UserActions | SettingsActions>;

if (process.env.NODE_ENV === 'production') {
  storeTemp = configureStoreProd();
} else {
  storeTemp = configureStoreDev();
}

export const store = storeTemp;
