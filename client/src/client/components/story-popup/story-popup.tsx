import React, {  useState } from 'react';
import './style.scss';

type IstoryPopup = {
  setShouldShowPopup: (props: any) => any
  setSettings?: any
  stories?: any
  storyId?: any
};

export default function StoryPopup({
  stories, setShouldShowPopup, setSettings, storyId,
}: IstoryPopup): JSX.Element {
  let defaultName = '';
  let defaultDescription = '';

  if (stories) {
    const currentStoryForEditing = stories.find((story:any) => story.id === storyId);
    defaultName = currentStoryForEditing.name;
    defaultDescription = currentStoryForEditing.description;
  }

  const [name, setName] = useState(defaultName);
  const [description, setDescription] = useState(defaultDescription);

  const submitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (stories) { // Editing story
      const newStory = { name, description, id: storyId };

      setSettings((prev: any) => {
        const newStories = prev.stories.map((story: any) => {
          if (story.id === storyId) {
            return newStory;
          }
          return story;
        });

        setShouldShowPopup(false);
        return {
          ...prev,
          stories: newStories,
        };
      });
    } else { // Adding story
      if (name === '') return;
      setShouldShowPopup(false);

      setSettings((prev: any) => ({
        ...prev,
        stories: [...prev.stories, {
          name,
          description,
          id: String(Date.now()),
        }],
      }));
    }
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
  setSettings: () => null,
  stories: [],
};
