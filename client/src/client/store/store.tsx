import configureStoreDev from './configure-store.dev';
import configureStoreProd from './configure-store.prod';
import { StoreType } from './types/middleware-types';

let storeTemp: StoreType;

if (process.env.NODE_ENV === 'production') {
  storeTemp = configureStoreProd();
} else {
  storeTemp = configureStoreDev();
}

export const store = storeTemp;
