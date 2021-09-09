import React, { useState } from 'react';
import './style.scss';

export default function JoinToGameForm(): JSX.Element {
  const [id, setId] = useState('');

  function onIdChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setId(e.target.value);
  }

  function onSubmitClick(e: React.MouseEvent<HTMLButtonElement>): void {
    e.preventDefault();
  }

  return (
    <form className="joinToGameFrom">
      <label className="joinToGameFrom__label" htmlFor="gameID">
        Game ID: 
        <input type="text" id="gameID" className="joinToGameFrom__gameId-field" 
          placeholder="Your game id" 
          value={id}
          onChange={onIdChange}/>
      </label>
      <button onClick={onSubmitClick}>Go To Game!</button>
    </form>
  );
}