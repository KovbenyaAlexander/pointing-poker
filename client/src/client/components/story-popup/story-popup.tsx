import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { IStory, ISettings } from '../../types';

import './style.scss';

type IstoryPopup = {
  setShouldShowPopup: React.Dispatch<React.SetStateAction<any>>;
  setSettings: React.Dispatch<React.SetStateAction<ISettings>>;
  stories?: Array<IStory>;
  storyId?: false | string;
};

export default function StoryPopup({
  stories, setShouldShowPopup, setSettings, storyId,
}: IstoryPopup): JSX.Element {
  let defaultName = '';
  let defaultDescription = '';

  if (stories) {
    const currentStoryForEditing = stories.find((story:IStory) => story.id === storyId);
    defaultName = currentStoryForEditing!.name;
    defaultDescription = currentStoryForEditing!.description;
  }

  const [name, setName] = useState(defaultName);
  const [description, setDescription] = useState(defaultDescription);

  const submitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (stories) { // Editing story
      const newStory = { name, description, id: storyId };

      if (name === '') {
        return;
      }

      setSettings((prev: ISettings) => {
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
      if (name === '') return;

      setSettings((prev: ISettings) => ({
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
};
