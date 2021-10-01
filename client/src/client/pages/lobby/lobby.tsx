import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import Exluding from '../../components/excluding/excluding';
import Launch from '../../components/launch/launch';
import MemberList from '../../components/members-list/member-list';
import Popup from '../../components/popup/popup';
import Settings from '../../components/settings/settings';
import { userJoin } from '../../store/thunk';
import { IStore } from '../../types/store-types';
import { isDealer } from '../../utils';
import './style.scss';

export default function Lobby(): JSX.Element {
  const { game, user } = useSelector((state: IStore) => state);
  const dispatch = useDispatch();
  const { gameID } = useParams<{ gameID: string }>();
  const dealer = user ? isDealer(game, user.userID) : false;

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
      {
        dealer
        && (
          <section className="lobby__settings">
            <Settings />
            <hr />
            <Launch />
          </section>
        )
      }
    </article>
  );
}