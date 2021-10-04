import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateSettings } from "../../../store/thunk";
import { IStore } from "../../../types";

import "./field-game.scss";

export function FieldGame() {
  const { user, game } = useSelector((state: IStore) => state);
  const { settings } = game;
  const powerNumber = settings.estimationType;
  const [selectedCard, setSelectedCard] = useState<number | null>(null);

  const users = ["1", "2", "3", "4"];
  function estimationType(n: number) {
    if (powerNumber === "power2") {
      return [...Array(n)].map((num, i) => (i > 2 ? 2 ** i : i));
    } else {
      return [...Array(n)].reduce(
        (acc, val, i) => acc.concat(i > 1 ? acc[i - 1] + acc[i - 2] : i),
        []
      );
    }
  }
  function addedVoteCard() {
    setSelectedCard(selectedCard);
  }

  function handleClickCard(e: any, card: any) {
    setSelectedCard(card);
  }

  const cards = estimationType(5);
  return (
    <section className="field-game">
      <div className="story-info">
        <h3>name story</h3>
        <div className="users-in-room">
          {users.map((user: string, index: number) => (
            <div key={user + index} className="user">
              {user}
            </div>
          ))}
        </div>
        <div className="vote_result">{!selectedCard ? "-" : selectedCard}</div>
      </div>

      <div className="round-info-controls">
        <div className="controll-ponel">
          <button onClick={addedVoteCard}>flip</button>
          <button onClick={() => setSelectedCard(null)}>reset</button>
        </div>
      </div>
      <div className="field">
        <div className="field-value-cards">
          <div className="selected-card">
            {!selectedCard ? "P" : selectedCard}
          </div>
          <div className="name-user">
            {user.name} {user.lastName}
          </div>
        </div>
        <div className="messange-container"></div>
      </div>
      {settings.isDealerInGame  && (
        <div className="cards-for-game">
          {[...cards, "?", "Pass"].map((card: number, index: number) => (
            <div
              key={card + index}
              className="card-for-game"
              onClick={(e) => handleClickCard(e, card)}
            >
              {card}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
