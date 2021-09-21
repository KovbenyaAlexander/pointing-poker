import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { UpdateSettings, UpdateUser } from '../../store/actions';
import { IStore } from '../../types';

import './style.scss';

export default function JoinToGameForm(): JSX.Element {
  const dispatch = useDispatch();
  const history = useHistory();
  const [id, setId] = useState('');

  function onIdChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setId(e.target.value);
  }

  const { socket} = useSelector((state: IStore) => ({socket: state.socket}));

  function onSubmitClick(e: React.MouseEvent<HTMLButtonElement>): void {
    e.preventDefault();
    dispatch(UpdateSettings({id}))
    dispatch(UpdateUser({name: 'GUEST'}))
    socket.emit('joinRoom', { name: `GUEST`, id });
    history.push(`/game/${id}`)
  }

  return (
    <form className="join-to-game-from">
      <label className="join-to-game-from__label" htmlFor="gameID">
        Game ID:
        <input
          type="text"
          id="gameID"
          className="join-to-game-from__gameId-field"
          placeholder="Your game id"
          value={id}
          onChange={onIdChange}
        />
      </label>
      <button type="button" onClick={onSubmitClick}>Go To Game!</button>
    </form>
  );
}
