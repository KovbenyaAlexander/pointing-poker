import { type } from 'os';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './style.scss';

type IstoryPopup = {
  id?: string | null
  setShouldShowPopup: (props: any) => any
  setSettings: any
};

export default function StoryPopup({
  id, setShouldShowPopup, setSettings,
}: IstoryPopup): JSX.Element {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const submitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
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
  id: null,
};
