import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { IStore, IStory } from '../../types';
import StoryPopup from '../../components/story-popup/story-popup';
import './style.scss';

export default function GamePage(): JSX.Element {
  const { user } = useSelector((store: any) => store);

  const game = useSelector((state:IStore) => state.game);
  // const [settings, setSettings] = useState(game.settings);

  const [shouldShowPopupForAdd, setShouldShowPopupForAdd] = useState(false);

  const addStoryHandler = () => {
    setShouldShowPopupForAdd(true);
  };

  return (
    <article className="game">
      <>

        <h2 className="game__title">There are all your games</h2>
        <p>{window.location.hash}</p>
        <p>
          first name:
          {user.name}
        </p>
        {user.lastName && (
          <p>
            {' '}
            last name:
            {user.lastName}
          </p>
        )}
        <p>
          job position
          {user.jobPosition}
        </p>
        {user.photoUser && (
          <img
            src={user.photoUser}
            style={{
              width: '50px',
              height: '50px',
              borderRadius: '50px',
            }}
          />
        )}
      </>

      {game.settings.stories.map((story: IStory) => (
        <div key={story.id}>
          <p>
            name:
            {story.name}
          </p>
          <p>
            descr:
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
    </article>
  );
}
