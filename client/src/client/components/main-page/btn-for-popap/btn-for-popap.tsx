import React, { useState } from 'react';
import './style.scss';

interface PopapState{
  statePopap: React.Dispatch<React.SetStateAction<boolean>>
}

export const BtnForPopap = ({statePopap}:PopapState) =>{

  function onSubmitClick(e: React.MouseEvent<HTMLButtonElement>): void {
    e.preventDefault();
    statePopap(true)
  }

  return (

      <button type="button" onClick={onSubmitClick}>Create New Game</button>

  );
}

{/* <label htmlFor="name" className="new-user-form__label">
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
</label> */}
