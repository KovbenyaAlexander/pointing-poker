import React, { ReactElement, useEffect, useState } from 'react';
import './style.scss';

export const JoinToGameOnLink = ():ReactElement =>{
  const pageGame = 'https/qwerty/game/#id1';



  const [textValue, setTextValue] = useState<string>('');
  const [validButton, setValidButton] = useState<boolean>(false);

  useEffect(()=>{
    if (textValue.length){
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
      console.log(true);
      setTextValue('');
    } else {
      console.log(false);
    }
  }

  return (
    <div className="App">
      <p>Connect to lobby by URL: </p>
      <form>
        <input type="text" value={textValue} onChange={(e)=> handleValue(e)}/>
        <button disabled ={validButton} onClick={(e) => handleClick(e)}>Play</button>
      </form>
    </div>
  );
};
