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
      <h2>Dealer:</h2>
      <Member name={dealer.name} imgSrc={dealer.imgSrc} userID={dealer.userID} />
      { isDelaerUser ? <LobbyDealerActions /> : '' }
    </section>
  );
}
