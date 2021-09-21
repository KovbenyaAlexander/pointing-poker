import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useHistory } from 'react-router';
import { cancelGame, activitySwitcher } from '../../store/thunk';
import { IStore } from '../../types';

export default function Launch(): JSX.Element {
  const dispatch = useDispatch();
  const history = useHistory();

  const {
    id, name, isActive, socket,
  } = useSelector((state: IStore) => ({
    name: state.user.name,
    id: state.game.id,
    isActive: state.game.isActive,
    socket: state.socket,
  }));

  const cancelGameHandler = () => {
    dispatch(cancelGame());
  };

  const gameActivitySwitcher = () => {
    if (!isActive) {
      socket.emit('joinRoom', { name, id });
      history.push(`/game/${id}`);
    }
    dispatch(activitySwitcher(isActive));
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

          <button type="button" onClick={gameActivitySwitcher}>
            {isActive ? 'Pause game' : 'Start game'}
          </button>

          <button type="button" onClick={cancelGameHandler}>Cancel game</button>
        </>
      )}

    </div>
  );
}
