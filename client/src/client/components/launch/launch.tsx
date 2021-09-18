import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { cancelGame, activateGame, createGame } from '../../store/thunk';
import { IStore } from '../../types/store-types';

export default function Launch(): JSX.Element {
  const dispatch = useDispatch();

  const { id, name } = useSelector((state: IStore) => ({
    name: state.user.name,
    id: state.game.id,
  }));

  const cancelGameHandler = () => {
    dispatch(cancelGame());
  };

  const startGameHandler = () => {
    dispatch(activateGame());
  };

  return (
    <div className="settings-page">
      {id && (
        <>
          <p>
            Your name:
            {name}
          </p>

          <p>
            Room id:
            {id}
            <CopyToClipboard
              text={id}
            >
              <button type="button">Copy id of game to clipboard</button>
            </CopyToClipboard>
          </p>
          <p>
            Link to game:
            {`http://localhost:3000/#/game/${id}`}
            <CopyToClipboard
              text={`http://localhost:3000/#/game/${id}`}
            >
              <button type="button">Copy link to game to clipboard</button>
            </CopyToClipboard>

          </p>

          <br />
          <button type="button" onClick={startGameHandler}>Start game</button>
          <button type="button" onClick={cancelGameHandler}>Cancel game</button>
        </>
      )}

    </div>
  );
}
