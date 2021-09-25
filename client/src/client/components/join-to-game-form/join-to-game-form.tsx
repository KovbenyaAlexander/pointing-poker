import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { UpdateSettings, UpdateUser } from '../../store/actions';
import { IStore } from '../../types';
import { join } from '../../store/thunk';
import './style.scss';

export default function JoinToGameForm(): JSX.Element {
  const dispatch = useDispatch();
  const history = useHistory();

  const [formState, setFormState] = useState({
    userName: 'new user',
    id: '',
    role: 'observer',
  });

  function onInputChangeHandler(e: React.ChangeEvent<HTMLInputElement>): void {
    setFormState({
      ...formState,
      [e.target.id]: e.target.value,
    });
  }

  function onRadioChangeHandler(e: React.ChangeEvent<HTMLInputElement>): void {
    const typeOfRadio = e.target.id;
    setFormState({
      ...formState,
      role: typeOfRadio,
    });
  }

  const { socket } = useSelector((state: IStore) => ({ socket: state.socket }));

  function onSubmitClick(e: React.MouseEvent<HTMLButtonElement>): void {
    e.preventDefault();
    dispatch(UpdateSettings({ id: formState.id }));
    dispatch(UpdateUser({ name: formState.userName }));
    socket.emit('joinRoom', { name: formState.userName, id: formState.id });
    history.push(`/game/${formState.id}`);
    dispatch(join({ name: formState.userName, id: formState.id, role: formState.role }));
  }

  return (
    <form className="join-to-game-from">
      <label className="join-to-game-from__label" htmlFor="userName">
        User Name:
        <input
          type="text"
          id="userName"
          className="join-to-game-from__name-field"
          placeholder="Your name"
          value={formState.userName}
          onChange={(e) => { onInputChangeHandler(e); }}
        />
      </label>

      <label className="join-to-game-from__label" htmlFor="id">
        Game ID:
        <input
          type="text"
          id="id"
          className="join-to-game-from__gameId-field"
          placeholder="Your game id"
          value={formState.id}
          onChange={(e) => { onInputChangeHandler(e); }}
        />

        <label htmlFor="observer">
          observer
          <input
            type="radio"
            name="familyStatus"
            id="observer"
            required
            checked={formState.role === 'observer'}
            onChange={(e) => onRadioChangeHandler(e)}
          />
        </label>
        <label htmlFor="player">
          player
          <input
            type="radio"
            name="familyStatus"
            id="player"
            onChange={(e) => onRadioChangeHandler(e)}
            checked={formState.role === 'player'}
          />
        </label>

      </label>
      <button type="button" onClick={onSubmitClick}>Go To Game!</button>
    </form>
  );
}
