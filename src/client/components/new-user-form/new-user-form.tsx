import React, { useState } from 'react';
import './style.scss';

export default function NewUserFrom(): JSX.Element {
  const [name, setName] = useState('');

  function onIdChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setName(e.target.value);
  }

  function onSubmitClick(e: React.MouseEvent<HTMLButtonElement>): void {
    e.preventDefault();
  }
  
  return (
    <form className="new-user-form">
      <label htmlFor="name" className="new-user-form__label">
        User Name
        <input type="text" name="" id="name" className="new-user-form__name"
          placeholder="Your Name"
          value={name} 
          onChange={onIdChange}/>
      </label>
      <button onClick={onSubmitClick}>Create New Game</button>
    </form>
  );
}