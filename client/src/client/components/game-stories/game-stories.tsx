import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { IStore, IStory } from '../../types';
import StoryPopup from '../story-popup/story-popup';
import './style.scss';

export default function GameStories(): JSX.Element {
  const game = useSelector((state:IStore) => state.game);
  const [shouldShowPopupForAdd, setShouldShowPopupForAdd] = useState(false);

  const addStoryHandler = () => {
    setShouldShowPopupForAdd(true);
  };

  return (
    <div className="game__stories">
      {game.settings.stories.map((story: IStory) => (
        <div key={story.id}>
          <p>
            name:
            {story.name}
          </p>
          <p>
            description:
            {story.description}
          </p>
          <hr />
        </div>
      ))}
      <button type="button" onClick={addStoryHandler}>Add story</button>

      {shouldShowPopupForAdd && (
        <StoryPopup
          stories={game.settings.stories}
          setShouldShowPopup={setShouldShowPopupForAdd}
          isGame
          settings={game.settings}
        />
      )}
    </div>
  );
}
