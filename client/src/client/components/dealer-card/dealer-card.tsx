import React from 'react';
import { useSelector } from 'react-redux';
import { IStore } from '../../types/store-types';
import { isDealer } from '../../utils';
import LobbyDealerActions from '../lobby-d-actions/lobby-d-actions';
import Member from '../member/member';
import './style.scss';

export default function DealerCard(): JSX.Element {
  const store = useSelector((state: IStore) => state);
  const dealer = store.game.members.filter((member) => member.role === 'dealer')[0];
  const isDelaerUser = isDealer(store, store.user.userID);

  return (
    <section className="dealer-card">
      <h2 className="dealer-card__header">Dealer:</h2>
      <Member user={dealer} />
      { isDelaerUser ? <LobbyDealerActions /> : '' }
    </section>
  );
}
