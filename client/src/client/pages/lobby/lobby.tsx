import React from 'react';
import { useSelector } from 'react-redux';
import Exluding from '../../components/excluding/excluding';
import MemberList from '../../components/members-list/member-list';
import Popup from '../../components/popup/popup';
import { IGame, IStore } from '../../types/store-types';
import './style.scss';

export default function Lobby(): JSX.Element {
  const game: IGame = useSelector((state: IStore) => state.game);

  return (
    <article className="lobby">
      <h3 className="lobby__title">
        Waiting for start game
        {' '}
        { game.settings.gameName }
      </h3>
      <MemberList />
      { game.excluding.isActive
        && (
          <Popup>
            <Exluding />
          </Popup>
        )}
      {/* TODO: if is dealer show settings  */}
    </article>
  );
}
