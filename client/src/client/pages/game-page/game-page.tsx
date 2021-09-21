import React from 'react';
import Chat from '../../components/chat/chat';

import './style.scss';

export default function GamePage(): JSX.Element {
  return (
    <article className="game">
      <h2 className="game__title">There are all your games</h2>
      <hr />
      <Chat />
    </article>
  );
}
