import React from 'react';
import './style.scss';

export default function LobbyDealerActions(): JSX.Element {
  const linkText = 'example_link';

  function handleCopy(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    navigator.clipboard.writeText(linkText);

  }
  return (
    <section className="dealer-actions">
      <h3 className="dealer-actions__link-title">Link To Lobby:</h3>
      <div className="dealer-actions__link-elements">
        <input className="dealer-actions__link" type="text" value={linkText} readOnly/>
        <button className="btn btn_active dealer-actions__button" type="button"
          onClick={handleCopy}
        >Copy Link</button>
      </div>
      <div className="dealer-actions__game">
        <button className="btn btn_active dealer-actions__game-start" type="button">Start Game</button>
        <button className="btn btn_passive dealer-actions__game-cancel" type="button">Cancel Game</button>
      </div>
    </section>
  );
}
