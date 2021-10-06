import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './style.scss';
import { v4 as uuidv4 } from 'uuid';
import { useHistory } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import { createGame, updateSettings } from '../../store/thunk';
import { IStore, IStory, ISettings } from '../../types';
import StoryPopup from '../story-popup/story-popup';
import { Stories } from '../settings-stories/settingsStories';

export default function Settings(): JSX.Element {
  const dispatch = useDispatch();
  const history = useHistory();
  const game = useSelector((state:IStore) => state.game);
  const [settings, setSettings] = useState(game.settings);
  const [shouldShowPopupForAdd, setShouldShowPopupForAdd] = useState(false);
  const [storyToEdit, setStoryToEdit] = useState<null | IStory>(null);
  const [errorValidation, setErrorValidation] = useState(false);

  const onSettingsSubmitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (settings.gameName.length < 5 || settings.gameName.length > 30) {
      setErrorValidation(true);
      return
    }

    if (settings.stories.length === 0) {
      toast.error(' To start the game you must create at least one story', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    if (game.id) {
      dispatch(updateSettings({ ...game, settings }));
    } else {
      dispatch(createGame({ ...game, settings }));
    }
  };

  const onPopupSubmit = (newStory: IStory) => {
    if (!storyToEdit) {
      setSettings((prev: ISettings) => ({ ...prev, stories: [...prev.stories, { ...newStory, id: uuidv4() }] }));
    } else {
      setSettings((prev: ISettings) => {
        const newStories = prev.stories.map((story: IStory) => {
          if (newStory.id === story.id) {
            return newStory;
          }
          return story;
        });

        return { ...prev, stories: newStories };
      });
    }
    setStoryToEdit(null);
    setShouldShowPopupForAdd(false);
  };

  useEffect(() => {
    if (settings.gameName.length < 5 || settings.gameName.length > 30) {
      setErrorValidation(true);
      return;
    }
    if (game.id && history.location.pathname !== `/lobby/${game.id}`) {
      history.push(`/lobby/${game.id}`);
    }
  }, [game.id]);

  useEffect(() => {
    if (settings.gameName.length > 4 || settings.gameName.length < 31) {
      setErrorValidation(false);
    }
  }, [settings.gameName]);

  return (
    <>
      <form className="settings" onSubmit={onSettingsSubmitHandler}>
        <div className="settings__container">
          <span>Name of game</span>
          <input
            type="text"
            value={settings.gameName}
            onChange={(e) => setSettings({ ...settings, gameName: e.target.value })}
          />
          {errorValidation && <span className="settings__validation-error">name length must be more than 4 characters and less than 30</span>}
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
         min="00:10" 
         max="99:59"
         required
       />
     </label>
   )}

        </div>
        <Stories
          stories={settings.stories}
          setSettings={setSettings}
          setStoryToEdit={setStoryToEdit}
          setShouldShowPopupForAdd={setShouldShowPopupForAdd}
        />

        <button type="button" onClick={() => setShouldShowPopupForAdd(true)}>Add story</button>
        <br />
        <br />
        <br />
        <button type="submit">{game.id ? 'Update game' : 'Create game'}</button>
      </form>

      {shouldShowPopupForAdd && (
        <StoryPopup
          setShouldShowPopup={setShouldShowPopupForAdd}
          onPopupSubmit={onPopupSubmit}
          storyToEdit={storyToEdit}
        />
      )}
      <ToastContainer />
    </>
  );
}
