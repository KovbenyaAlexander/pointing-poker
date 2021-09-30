import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { updateSettings } from '../../store/thunk';
import { IStory, ISettings } from '../../types';

import './style.scss';

type IstoryPopup = {
  setShouldShowPopup: React.Dispatch<React.SetStateAction<any>>;
  setSettings?: React.Dispatch<React.SetStateAction<ISettings>>;
  stories?: Array<IStory>;
  storyId?: false | string;
  isGame?: boolean;
  settings?: ISettings
};

export default function StoryPopup({
  stories, setShouldShowPopup, setSettings, storyId, isGame, settings,
}: IstoryPopup): JSX.Element {
  const dispatch = useDispatch();

  let defaultName = '';
  let defaultDescription = '';

  if (stories && !isGame) {
    const currentStoryForEditing = stories.find((story:IStory) => story.id === storyId);
    defaultName = currentStoryForEditing!.name;
    defaultDescription = currentStoryForEditing!.description;
  }

  const [name, setName] = useState(defaultName);
  const [description, setDescription] = useState(defaultDescription);

  const submitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (name === '') return;

    if (isGame) {
      const newStories = [...settings!.stories, {
        name, description, id: uuidv4(),
      }];

      dispatch(updateSettings({ ...settings!, stories: newStories }));
    } else if (stories) { // Editing story
      const newStory = { name, description, id: storyId };
      setSettings!((prev: ISettings) => {
        const newStories = prev.stories.map((story: any) => {
          if (story.id === storyId) {
            return newStory;
          }
          return story;
        });
        return {
          ...prev,
          stories: newStories,
        };
      });
    } else { // Adding story
      setSettings!((prev: ISettings) => ({
        ...prev,
        stories: [...prev.stories, {
          name,
          description,
          id: uuidv4(),
        }],
      }));
    }
    setShouldShowPopup(false);
  };

  const onCloseHandler = () => {
    setShouldShowPopup(false);
  };

  return (
    <div className="story-popup">
      <form onSubmit={(e) => submitHandler(e)} className="story-popup-wrapper">

        <div className="popup__name">
          <p>Story name:*</p>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="popup__description">
          <p>Story description:</p>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <button type="submit">Submit</button>
        <button type="button" onClick={onCloseHandler}>Close</button>
      </form>
    </div>

  );
}

StoryPopup.defaultProps = {
  storyId: null,
  stories: null,
  setSettings: null,
  settings: {},
  isGame: false,
};
