import { IStore } from './types/store-types';

export function isDealer(store: IStore, id: string): boolean {
  const dealer = store.game.members.filter((member) => member.role === 'dealer')[0];
  return dealer.userID === id;
}

export function isCurrentUser(store: IStore, id: string): boolean {
  return store.user.userID === id;
}
