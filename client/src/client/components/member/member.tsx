import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { IStore, IUserInfo } from '../../types/store-types';
import { isCurrentUser, isDealer } from '../../utils';
import Avatar from '../avatar/avatar';
import ExcludingInit from '../excluding-init/excluding-init';
import Popup from '../popup/popup';
import './style.scss';

export default function Member({ user } : { user: IUserInfo }): JSX.Element {
  const store = useSelector((state: IStore) => state);
  const [excludePopup, setExcludePopup] = useState(false);
  const { userID, name, imgSrc } = user;
  const isExludable = !isDealer(store, userID) && !isCurrentUser(store, userID) && (store.game.members.length - 1) >= 3;

  function handleExcludeInit(): void {
    setExcludePopup(true);
  }
  return (
    <figure className="member">
      <Avatar name={name} imgSrc={imgSrc} />
      <h4>{ name }</h4>
      { isExludable && (
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            handleExcludeInit();
          }}
        >
          Exclude
        </button>
      ) }
      {excludePopup && (
        <Popup><ExcludingInit user={user} close={setExcludePopup} /></Popup>
      )}
    </figure>
  );
}
