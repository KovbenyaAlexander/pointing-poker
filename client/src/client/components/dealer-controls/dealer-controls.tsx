import React from 'react';
import { useSelector } from 'react-redux';
import { IStore } from '../../types';
import './style.scss';

export default function DealerControls(): JSX.Element {
  const socket = useSelector((state: IStore) => state.socket);
  const isRoundActive = useSelector((state: IStore) => state.game.isRoundActive);
  const stories = useSelector((state: IStore) => state.game.settings.stories);
  const activeStory = stories.find((story) => story.isActive);

  function onRoundStart(): void {
    socket?.startRound();
  }

  function onRoundStop(): void {
    socket?.stopRound();
  }

  return (
    <div className="dealer-controls">
      <button
        type="button"
        className="button dealer-controls__start-round"
        onClick={onRoundStart}
        disabled={isRoundActive}
      >
        Start Round
      </button>
      <button
        type="button"
        className="button dealer-controls__stop-round"
        onClick={onRoundStop}
        disabled={!isRoundActive}
      >
        Stop Round
      </button>
      {activeStory && <button type="button" className="button dealer-controls__finish-story">Finish Story</button>}
      <button type="button" className="button dealer-controls__finish-game">Finish Game</button>
    </div>
  );
}
