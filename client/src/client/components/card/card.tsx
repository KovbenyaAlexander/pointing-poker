import React from 'react';
import { useSelector } from 'react-redux';
import { IStore } from '../../types';
import './style.scss';

export default function Card({ children } : { children: number | string }): JSX.Element {
  const id = `card_${children}`;
  const user = useSelector((state: IStore) => state.user);
  const { isRoundActive, settings } = useSelector((state: IStore) => state.game);

  const canIUse = !isRoundActive || user.role === 'observer'
  || (user.role === 'dealer' && !settings.isDealerInGame)
  || ((!!user.choose || user.choose === 0) && !settings.isVoteMutable);

  return (
    <label htmlFor={id} className="card">
      <input
        type="radio"
        className="card__radio"
        name="card"
        id={id}
        value={children}
        defaultChecked={(user.choose === children || (user.choose === 0 && children === 'Unknow')) && isRoundActive}
        disabled={canIUse}
      />
      <p className="card__pointer card__pointer_upper">{children}</p>
      <p className="card__pointer card__pointer_lower">{children}</p>
      <div className="card__selected">{' '}</div>
    </label>
  );
}
