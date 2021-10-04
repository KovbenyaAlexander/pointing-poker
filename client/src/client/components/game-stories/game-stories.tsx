import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { IStore, IStory } from '../../types';
import StoryPopup from '../story-popup/story-popup';
import { updateSettings } from '../../store/thunk';
import ActiveStory from '../active-story/active-story';

import './style.scss';

export default function GameStories(): JSX.Element {
  const dispatch = useDispatch();
  const game = useSelector((state:IStore) => state.game);
  const user = useSelector((state:IStore) => state.user);
  const [activeStory, setActiveStory] = useState<IStory>(game.settings.stories[0])
  const { settings } = game;
  const [shouldShowPopupForAdd, setShouldShowPopupForAdd] = useState(false);

  const addStoryHandler = () => {
    setShouldShowPopupForAdd(true);
  };

  const onPopupSubmit = (newStory: IStory) => {
    setShouldShowPopupForAdd(false);
    dispatch(updateSettings({ ...game, settings: { ...settings, stories: [...settings.stories, { ...newStory, id: uuidv4() }] } }));
  };

  // setInterval(()=>{
  //   console.log(`INTERVAL`)
  // }, 3000)


  console.log(game.settings.stories)
  // const activeStory = game.settings.stories.find((story: IStory)=>story.isActive)

  return (
    <div className="game__stories">
      <ActiveStory story={activeStory}/>
      {game.settings.stories.map((story: IStory) => {
        
        // if(story.isActive){
        //   setActiveStory(story)
        // }
        
        return (
        <div key={story.id}>
          <p>
            name:
            {story.name}
          </p>
          <p>
            description:
            {story.description}
          </p>
          {story.isCompleted ? <p> Estimation: {story.estimation}</p> : <p> Task is not completed</p>}
          <hr />
        </div>
      )
      })}

      {user.role==="dealer" && <button type="button" onClick={addStoryHandler}>Add story</button>}

      {shouldShowPopupForAdd && (
        <StoryPopup
          setShouldShowPopup={setShouldShowPopupForAdd}
          onPopupSubmit={onPopupSubmit}
        />
      )}
    </div>
  );
}
