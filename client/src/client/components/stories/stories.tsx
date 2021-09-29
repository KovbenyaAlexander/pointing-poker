import React, { ReactElement, useEffect, useState } from 'react';
import './style.scss';

interface IStories {
  stories: any;
  setSettings :any
  setStoryIdForEditing: any
}

export const Stories = ({ stories, setSettings, setStoryIdForEditing }: IStories):JSX.Element => {
  const removeStoryHandler = (id: string) => {
    setSettings((prev: any) => ({
      ...prev,
      stories: prev.stories.filter((item: any) => !(item.id === id)),
    }));
  };

  const editStoryHandler = (id: string) => {
    setStoryIdForEditing(id);
  };

  return (
    <div>
      <div className="stories-container">
        {stories.map((story: any) => (
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
