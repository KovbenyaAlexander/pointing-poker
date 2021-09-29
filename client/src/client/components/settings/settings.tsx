import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './style.scss';
import { createGame, updateSettings } from '../../store/thunk';
import { IStore } from '../../types/index';
import StoryPopup from '../story-popup/story-popup';
import { Stories } from '../stories/stories';

export default function Settings(): JSX.Element {
  const dispatch = useDispatch();
  const game = useSelector((state:IStore) => state.game);
  const [settings, setSettings] = useState(game.settings);
  const [shouldShowPopup, setShouldShowPopup] = useState(false);
  const [shouldEditStory, setShouldEditStory] = useState(false);
  const [storyId, setStoryId] = useState<null | string>(null);

  const onSubmitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (game.id) {
      dispatch(updateSettings({ settings }));
    } else {
      dispatch(createGame({ settings }));
    }
  };

  const removeStoryHandler = (id: string) => {
    setSettings((prev) => ({
      ...prev,
      stories: prev.stories.filter((item) => !(item.id === id)),
    }));
  };

  const editStoryHandler = (id: string) => {
    setShouldEditStory(true);
    setStoryId(id);
  };

  return (
    <>
      <form className="settings" onSubmit={onSubmitHandler}>
        <>
          <span>Name of game</span>
          <input
            type="text"
            value={settings.gameName}
            onChange={(e) => setSettings({ ...settings, gameName: e.target.value })}
          />
          <br />

          <span>Dealer in game</span>
          <input
            type="checkbox"
            checked={settings.isDealerInGame}
            onChange={(e) => setSettings({ ...settings, isDealerInGame: e.target.checked })}

          />

          <br />

          <span>Auto entry</span>
          <input
            type="checkbox"
            checked={settings.isAutoEntry}
            onChange={(e) => setSettings({ ...settings, isAutoEntry: e.target.checked })}
          />

          <br />

          <span>Auto finish</span>
          <input
            type="checkbox"
            checked={settings.isAutoFinish}
            onChange={(e) => setSettings({ ...settings, isAutoFinish: e.target.checked })}
          />

          <br />

          <span>Allow change vote</span>
          <input
            type="checkbox"
            checked={settings.isVoteMutable}
            onChange={(e) => setSettings({ ...settings, isVoteMutable: e.target.checked })}
          />

          <br />

          <p>Estimation Type</p>
          <label htmlFor="single">
            Power of number 2
            <input
              type="radio"
              name="Estimation"
              id="PowerOf2"
              checked={settings.estimationType === 'power2'}
              onChange={() => setSettings({ ...settings, estimationType: 'power2' })}
            />
          </label>

          <br />

          <label htmlFor="single">
            Fibonacci numbers
            <input
              type="radio"
              name="Estimation"
              id="Fibonacci"
              checked={settings.estimationType === 'fibonacci'}
              onChange={() => setSettings({ ...settings, estimationType: 'fibonacci' })}

            />
          </label>

          <br />

          <span>Timer </span>
          <input
            type="checkbox"
            checked={settings.isTimerRequired}
            onChange={(e) => setSettings({ ...settings, isTimerRequired: e.target.checked })}

          />
          <br />
          {settings.isTimerRequired
   && (
     <label htmlFor="appt-time">
       Choose time:
       <input
         id="appt-time"
         type="time"
         value={settings.timerValue}
         onChange={(e) => setSettings({ ...settings, timerValue: e.target.value })}
       />
     </label>
   )}

        </>
        <Stories
          stories={settings.stories}
          removeStoryHandler={removeStoryHandler}
          editStoryHandler={editStoryHandler}
        />

        <button type="button" onClick={() => setShouldShowPopup(true)}>Add story</button>
        <button type="submit">{game.id ? 'Update game' : 'Create game'}</button>

      </form>
      {shouldShowPopup && <StoryPopup setShouldShowPopup={setShouldShowPopup} setSettings={setSettings} />}
      {shouldEditStory && <StoryPopup setShouldShowPopup={setShouldEditStory} setSettings={setSettings} stories={settings.stories} storyId={storyId} />}
    </>
  );
}
