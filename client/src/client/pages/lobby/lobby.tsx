import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import Exluding from '../../components/excluding/excluding';
import MemberList from '../../components/members-list/member-list';
import Popup from '../../components/popup/popup';
import { userJoin } from '../../store/thunk';
import { IGame, IStore } from '../../types/store-types';
import './style.scss';

export default function Lobby(): JSX.Element {
  const game: IGame = useSelector((state: IStore) => state.game);
  const dispatch = useDispatch();
  const { gameID } = useParams<{ gameID: string }>();

  useEffect(() => {
    dispatch(userJoin(gameID));
  }, []);

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
