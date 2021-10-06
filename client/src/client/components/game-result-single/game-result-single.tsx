import React from 'react';
import { IGame } from '../../types';
import './style.scss';

export default function GameResultSingle({ game } : { game: IGame }): JSX.Element {
  return (
    <tr>
      <td>{game.settings.gameName}</td>
      <td>{' '}</td>
      <td>{ game.isCompleted ? 'Completed' : 'In process' }</td>
      <td>{game.settings.gameResult}</td>
    </tr>
  );
}
