import React, { useEffect, useState } from 'react'
import nextId from 'react-id-generator';
import { useSelector } from 'react-redux';
import { IStore } from '../../../types';
import qs from 'qs'
import { createBrowserHistory } from "history";

export function FieldGame({state}:any) {
  
  const select = useSelector((sel: IStore) => sel);
  const powerNumber = select.game.settings.estimationType;
  const key = nextId("key-card");

  const [isCardAction, setIsCardAction] = useState<any>({
    selectedCard: '',
    showSelectedCard: '',
  });

console.log(isCardAction);


  // useEffect(() => {
  //   return setIsCardAction({ isCardAction: JSON.parse(window.localStorage.getItem('selectedCard')) });
  // }, []);

  useEffect(() => {
    window.localStorage.setItem('selectedCard', isCardAction.selectedCard);
  }, [isCardAction.selectedCard]);

  function fibonacci(n: number) {
    if (powerNumber === "power2") {
      return [...Array(n)].map((num, i) => (i > 2 ? 2 ** i : i));
    } else {
      return [...Array(n)].reduce(
        (acc, val, i) => acc.concat(i > 1 ? acc[i - 1] + acc[i - 2] : i),
        []
      );
    }
  }

  const cards = fibonacci(5);
  return (
    <section className="field-game">

    <div className="round-info-controls">
      {/* <h3>{addStory}</h3> */}
      <div className="controll-ponel">
        <button
          onClick={() =>
            setIsCardAction({
              ...isCardAction,
              showSelectedCard: isCardAction.selectedCard,
            })
          }
        >
          flip
        </button>
        <button
          onClick={() =>
            setIsCardAction({
              selectedCard: '',
              showSelectedCard: '',
            })
          }
        >
          reset
        </button>
      </div>

      <div className="current-score">
        {/* {!selectedCard ? '-' : selectedCard} */}
        {!isCardAction.selectedCard ? "-" : isCardAction.selectedCard}
      </div>
    </div>
    {/* timer */}


    <div className="field-value-cards">
      <div className="selected-card">{isCardAction.showSelectedCard}</div>
    </div>

  
      <div className="cards-for-game">
        {[...cards, "?", "Pass"].map((card: number, index: number) => (
          <div
            key={key + index}
            className="card-for-game"
            onClick={() =>
              setIsCardAction({ ...isCardAction, selectedCard: card })
            }
          >
            {card}
          </div>
        ))}
      </div>

  </section>
  )
}


