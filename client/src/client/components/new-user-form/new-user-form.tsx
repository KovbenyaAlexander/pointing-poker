import React, { useState } from 'react';
// import './style.scss';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { UpdateUser } from '../../store/actions';
// import { UpdateUser } from '../../store/actions';

export default function NewUserFrom(): JSX.Element {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const history = useHistory();

  function onIdChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setName(e.target.value);
  }

  function onSubmitClick(e: React.MouseEvent<HTMLButtonElement>): void {
    e.preventDefault();
    // dispatch(UpdateUser({ name }));
    history.push('settings');
  }

  return (
    <form className="new-user-form">
      <label htmlFor="name" className="new-user-form__label">
        User Name
        <input
          type="text"
          name=""
          id="name"
          className="new-user-form__name"
          placeholder="Your Name"
          value={name}
          onChange={onIdChange}
        />
      </label>
      <button type="button" onClick={onSubmitClick}>Create New Game</button>
    </form>
  );
}
