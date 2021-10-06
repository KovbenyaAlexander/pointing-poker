import React from 'react';
import { useSelector } from 'react-redux';
import { IStore, IUserInfo } from '../../types';
import ResultsCards from '../results-cards/results-cards';
import './style.scss';

export default function RoundResults(): JSX.Element {
  const { members, isRoundActive } = useSelector((state: IStore) => state.game);
  let all = 0;

  function calculateResult(people: IUserInfo[]): { [key: string]: number } {
    const values: { [key: string]: number } = {};
    people.forEach((human) => {
      if (human.choose || human.choose === 0) {
        const choose = human.choose === 0 ? 'Unknow' : human.choose;
        if (!values[`${choose}`]) {
          values[`${choose}`] = 0;
        }
        values[`${choose}`] += 1;
        all += 1;
      }
    });
    return values;
  }

  return (
    <div className="round-results">
      {isRoundActive ? <p>Round in process</p> : <ResultsCards values={calculateResult(members)} all={all} />}
    </div>
  );
}
