import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCard } from '../../store/thunk';
import { IStore } from '../../types';
import Card from '../card/card';
import './style.scss';

export default function Cards(): JSX.Element {
  const settings = useSelector((state: IStore) => state.game.settings);
  const user = useSelector((state: IStore) => state.user);
  const dispatch = useDispatch();

  function fibonacci(n: number): number {
    if (n === 1) return 1;
    if (n === 0) return 0;
    return fibonacci(n - 2) + fibonacci(n - 1);
  }

  function onCardSelect(e: React.ChangeEvent<HTMLFormElement>) {
    if (user.choose && !settings.isVoteMutable) return;
    let n = e.target.value;
    if (n === 'Unknow') {
      n = 0;
    }
    dispatch(setCard(+n));
  }

  function cardsArray() {
    const arr = Array(5)
      .fill(1)
      .map((one, index) => (
        <Card key={`card_${Math.random()}`}>
          {
            settings.estimationType === 'power2' ? 2 ** index : fibonacci(index + 2)
          }
        </Card>
      ));
    arr.push(<Card key={`card_${Math.random()}`}>Unknow</Card>);
    return arr;
  }

  return (
    <form className="cards" onChange={onCardSelect}>
      {cardsArray()}
    </form>
  );
}
