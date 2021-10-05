import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { IStore, IStory } from '../../types';
import StoryPopup from '../story-popup/story-popup';
import { updateSettings } from '../../store/thunk';

import './style.scss';

export default function GameStories(): JSX.Element {
  const dispatch = useDispatch();
  const game = useSelector((state:IStore) => state.game);
  const { settings } = game;
  const [shouldShowPopupForAdd, setShouldShowPopupForAdd] = useState(false);

  const addStoryHandler = () => {
    setShouldShowPopupForAdd(true);
  };

  const onPopupSubmit = (newStory: IStory) => {
    setShouldShowPopupForAdd(false);
    dispatch(updateSettings({ ...game, settings: { ...settings, stories: [...settings.stories, { ...newStory, id: uuidv4() }] } }));
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
          setShouldShowPopup={setShouldShowPopupForAdd}
          onPopupSubmit={onPopupSubmit}
        />
      )}
    </div>
  );
}
