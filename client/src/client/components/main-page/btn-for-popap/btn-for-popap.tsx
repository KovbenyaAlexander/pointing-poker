import React, { ReactElement } from 'react';
import './style.scss';

interface PopapState{
  statePopap: React.Dispatch<React.SetStateAction<boolean>>
}

export const BtnForPopap = ({ statePopap }:PopapState):ReactElement => {
  function onSubmitClick(e: React.MouseEvent<HTMLButtonElement>): void {
    e.preventDefault();
    statePopap(true);
  }

  return (

    <button type="button" onClick={onSubmitClick}>Create New Game</button>

  );
};
