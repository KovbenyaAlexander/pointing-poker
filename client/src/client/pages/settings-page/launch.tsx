import React, { useEffect } from 'react';
import './style.scss';
import { useDispatch, useSelector } from 'react-redux';
import { createGame, cancelGame, startGame } from '../../store/thunk';
import { IStore } from '../../store/types/store-types';
import Settings from './settings';

export default function Launch(): JSX.Element {
  const dispatch = useDispatch();

  const { id, name } = useSelector((state: IStore) => ({
    name: state.user.name,
    id: state.settings.id,
  }));

  const cancelGameHandler = () => {
    dispatch(cancelGame());
  };

  const startGameHandler = () => {
    dispatch(startGame());
  };

  const copyLinkHandler=()=>{
    navigator.clipboard.writeText(`http://localhost:3000/#/game/${id}`);
  }

  return (
    <div className="settings-page">
      <p>
        Room id:
        {id}
      </p>
      <p>
        Link to game:
        {`http://localhost:3000/#/game/${id}`}
      </p>
      <p>
        Your name:
        {name}
      </p>
      <button type="button" onClick={startGameHandler}>Start game</button>
      <button type="button" onClick={cancelGameHandler}>Cancel game</button>
      <button type="button" onClick={copyLinkHandler}>Copy link</button>

    </div>
  );
}
