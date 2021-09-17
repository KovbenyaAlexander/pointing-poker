import React from 'react';
import { useSelector } from 'react-redux';
import DealerCard from '../../components/dealer-card/dealer-card';
import MemberList from '../../components/members-list/member-list';
import { IStore } from '../../types/store-types';
import './style.scss';

export default function Lobby(): JSX.Element {
  const store: IStore = useSelector((state: IStore) => state);

  return (
    <article className="lobby">
      <h3 className="lobby__title">
        Waiting for start game
        {' '}
        { store.game.gameID }
      </h3>
      <DealerCard />
      <MemberList />
      {/* TODO: if is dealer show settings  */}
    </article>
  );
}
