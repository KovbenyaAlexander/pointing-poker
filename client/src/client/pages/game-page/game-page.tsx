import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import Cards from '../../components/cards/cards';
import Chat from '../../components/chat/chat';
import GameInfo from '../../components/game-info/game-info';
import { IStore } from '../../types';
import './style.scss';

export default function GamePage(): JSX.Element {
  const game = useSelector((state: IStore) => state.game);
  const history = useHistory();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (!game.id) history.push(`/lobby/${id}`);
  }, [game.id]);

  return (
    <article className="game">
      <GameInfo />
      <section className="game__chat"><Chat /></section>
      <section className="game__issues"><p>Issue</p></section>
      <Cards />
    </article>
  );
}
