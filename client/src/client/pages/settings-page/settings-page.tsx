import React, { useEffect } from 'react';
import './style.scss';
import { useDispatch, useSelector } from 'react-redux';
import { createGame, cancelGame, startGame } from '../../store/thunk';
import { IStore } from '../../store/types/store-types';
import Settings from './settings';

export default function SettingsPage(): JSX.Element {
  const dispatch = useDispatch();

  const { id, name } = useSelector((state: IStore) => ({
    name: state.user.name,
    id: state.settings.id,
  }));

  useEffect(() => {
    dispatch(createGame());
  }, []);

  const cancelGameHandler = () => {
    dispatch(cancelGame());
  };

  const startGameHandler = () => {
    dispatch(startGame());
  };

  return (
    <div className="settings-page">
      <Settings />
      <hr />
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

    </div>
  );
}
