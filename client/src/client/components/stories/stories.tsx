import React from 'react';
import { IStory, ISettings } from '../../types';
import './style.scss';

interface IStories {
  stories: Array<IStory>;
  setSettings: React.Dispatch<React.SetStateAction<ISettings>>
  setStoryIdForEditing: React.Dispatch<React.SetStateAction<false | string>>
}

export const Stories = ({ stories, setSettings, setStoryIdForEditing }: IStories):JSX.Element => {
  const removeStoryHandler = (id: string) => {
    setSettings((prev: ISettings) => ({
      ...prev,
      stories: prev.stories.filter((item: IStory) => !(item.id === id)),
    }));
  };

  const editStoryHandler = (id: string) => {
    setStoryIdForEditing(id);
  };

  return (
    <div>
      <div className="stories-container">
        {stories.map((story: IStory) => (
          <div className="story" key={story.id}>
            <p className="story__name">
              name:
              {story.name}
            </p>
            {story.description && (
              <p className="story__description">
                description:
                {story.description}
              </p>
            )}

            <button type="button" onClick={() => editStoryHandler(story.id)}>Edit</button>
            <button type="button" onClick={() => removeStoryHandler(story.id)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
};
