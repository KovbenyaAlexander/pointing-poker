import React from 'react';
import './style.scss';

export default function Card({ children } : { children: number | string }): JSX.Element {
  const id = `card_${children}`;

  return (
    <label htmlFor={id} className="card">
      <input
        type="radio"
        className="card__radio"
        name="card"
        id={id}
        value={children}
      />
      <p className="card__pointer card__pointer_upper">{children}</p>
      <p className="card__pointer card__pointer_lower">{children}</p>
      <div className="card__selected">{' '}</div>
    </label>
  );
}
