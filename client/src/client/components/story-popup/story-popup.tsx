import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './style.scss';

type IstoryPopup = {
  id?: string | null
  setShouldShowPopup: (props: any) => any
  onSubmit?: () => void
};

export default function StoryPopup({ id, setShouldShowPopup, onSubmit }: IstoryPopup): JSX.Element {
  const [storyName, setStoryName] = useState('');
  const [storyDescription, setStoryDescription] = useState('');

  const submitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setShouldShowPopup(false);
  };

  return (
    <div className="story-popup">
      <form onSubmit={(e) => submitHandler(e)} className="story-popup-wrapper">

        <div className="story__name">
          <p>Story name:</p>
          <input
            type="text"
            value={storyName}
            onChange={(e) => setStoryName(e.target.value)}
          />
        </div>

        <div className="story__description">
          <p>Story description:</p>
          <textarea
            value={storyDescription}
            onChange={(e) => setStoryDescription(e.target.value)}
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>

  );
}

StoryPopup.defaultProps = {
  id: null,
};
