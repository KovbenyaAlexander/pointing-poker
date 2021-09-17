import React from 'react';
import './style.scss';

export default function LobbyDealerActions(): JSX.Element {
  return (
    <section className="dealer-actions">
      <h3 className="dealer-actions__link-title">Link To Lobby:</h3>
      <div className="dealer-actions__link-elements">
        <input className="dealer-actions__link" type="text" placeholder="there will be a link" />
        <button className="btn btn_active dealer-actions__button" type="button">Copy Link</button>
      </div>
      <div className="dealer-actions__game">
        <button className="btn btn_active dealer-actions__game-start" type="button">Start Game</button>
        <button className="btn btn_passive dealer-actions__game-cancel" type="button">Cancel Game</button>
      </div>
    </section>
  );
}
