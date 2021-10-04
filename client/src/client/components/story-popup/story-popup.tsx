import React, { useState } from 'react';
import { IStory } from '../../types';

import './style.scss';

type IstoryPopup = {
  setShouldShowPopup: React.Dispatch<React.SetStateAction<any>>;
  storyToEdit?: IStory | null;
  onPopupSubmit: (props: IStory)=>void
};

export default function StoryPopup({ setShouldShowPopup, storyToEdit, onPopupSubmit }: IstoryPopup): JSX.Element {
  const [name, setName] = useState(storyToEdit?.name || '');
  const [description, setDescription] = useState(storyToEdit?.description || '');

  const submitHandler = (e: React.FormEvent ) => {
    e.preventDefault();
    onPopupSubmit({ name, description, id: storyToEdit?.id || '', estimation: null, isActive: false, isCompleted: false });
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
            required
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
        <button type="button" onClick={() => setShouldShowPopup(false)}>Close</button>
      </form>
    </div>

  );
}
