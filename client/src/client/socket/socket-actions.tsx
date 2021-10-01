import {
  setInitialStore, StartExclude, UpdateMembers,
} from '../store/actions';
import { store } from '../store/store';
import { IExclude, IUserInfo } from '../types/store-types';

export function onSocketUpdateMembers(members: IUserInfo[]): void {
  store.dispatch(UpdateMembers(members));
}

export function onSocketExcluding(excluding: IExclude): void {
  store.dispatch(StartExclude(excluding));
}

export function onSocketExcludeEnd(message: string): void {
  alert(message);
}

export function onSocketExcluded(excluding: IExclude): void {
  store.dispatch(setInitialStore());
  store.dispatch(StartExclude(excluding));
}

export function onSocketUpdateExcluding(excluding: IExclude): void {
  store.dispatch(StartExclude(excluding));
}

export function onSocketGameEnd(): void {
  store.dispatch(setInitialStore());
}
