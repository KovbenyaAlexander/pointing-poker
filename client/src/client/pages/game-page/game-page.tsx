import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useSelector } from 'react-redux';
import Chat from '../../components/chat/chat';
import { IStore } from '../../types';

import './style.scss';

export default function GamePage(): JSX.Element {
  const { id } = useSelector((s: IStore) => ({
    id!: s.game.id,
  }));

  return (
    <article className="game">
      <h2 className="game__title">There are all your games</h2>

      <hr />

      <p>
        Room id:
        {id}
        <CopyToClipboard
          text={id!}
        >
          <button type="button">Copy id of game to clipboard</button>
        </CopyToClipboard>
      </p>

      <hr />
      <Chat />
    </article>
  );
}
