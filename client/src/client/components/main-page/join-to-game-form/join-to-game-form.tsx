import React, { ReactElement, useEffect, useState } from 'react';
import './style.scss';

interface IJoinToOnGame{
  statePopap: React.Dispatch<React.SetStateAction<boolean>>
}

export const JoinToGameOnLink = ({ statePopap }:IJoinToOnGame):ReactElement => {
  const pageGame = 'https/qwerty/game/#id1';

  const [textValue, setTextValue] = useState<string>('');
  const [validButton, setValidButton] = useState<boolean>(false);
  const [validForm, setValidForm] = useState(false);
  const [errorTextValid, setErrorTextValid] = useState('');

  useEffect(() => {
    if (textValue.length) {
      setValidButton(false);
    } else {
      setValidButton(true);
    }
  }, [textValue]);

  function handleValue(e:React.ChangeEvent<HTMLInputElement>) {
    setTextValue(e.target.value);
  }

  function handleClick(e:React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    if (textValue === pageGame) {
      setTextValue('');
      setValidForm(true);
      setErrorTextValid('game found...');
    } else {
      setErrorTextValid('game not found...');
      setValidButton(false);
      statePopap(true);
    }
  }

  return (
    <div className="App">
      <p>Connect to lobby by URL: </p>
      <form>
        <input type="text" value={textValue} onChange={(e) => handleValue(e)} />
        <button type="button" disabled={validButton} onClick={(e) => handleClick(e)}>Play</button>
      </form>
      {!validForm ? errorTextValid : ''}
    </div>
  );
};
