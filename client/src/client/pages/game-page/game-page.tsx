import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import Cards from '../../components/cards/cards';
import Chat from '../../components/chat/chat';
import DealerControls from '../../components/dealer-controls/dealer-controls';
import GameInfo from '../../components/game-info/game-info';
import GameStories from '../../components/game-stories/game-stories';
import Timer from '../../components/timer/timer';
import { IStore } from '../../types';
import './style.scss';

export default function GamePage(): JSX.Element {
  const { game, user } = useSelector((state: IStore) => state);
  const history = useHistory();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (!game.id) history.push(`/lobby/${id}`);
  }, [game.id]);

  return (
    <article className="game">
      <GameInfo />
      <section className="game__chat"><Chat /></section>
      <section className={`game__issues game__issues_${user.role}`}><GameStories /></section>
      {user.role === 'dealer' && <section className="game__dealer-controls"><DealerControls /></section>}
      <Cards />
      {game.isRoundActive && game.settings.isTimerRequired && <Timer />}
    </article>
  );
}
