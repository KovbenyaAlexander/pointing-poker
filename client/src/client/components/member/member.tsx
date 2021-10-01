import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { IStore, IUserInfo } from '../../types/store-types';
import { isCurrentUser, isDealer } from '../../utils';
import Avatar from '../avatar/avatar';
import ExcludingInit from '../excluding-init/excluding-init';
import Popup from '../popup/popup';
import './style.scss';

export default function Member({ user } : { user: IUserInfo }): JSX.Element {
  const game = useSelector((state: IStore) => state.game);
  const [excludePopup, setExcludePopup] = useState(false);
  const { userID, name, photoUser } = user;
  const isDealerMember = isDealer(game, userID);
  const isExludable = !isDealerMember && !isCurrentUser(user, userID) && (game.members.length - 1) >= 3;

  function handleExcludeInit(): void {
    setExcludePopup(true);
  }
  return (
    <figure className="member">
      <Avatar name={name} imgSrc={photoUser} />
      <h4 className="member__name">{ name }</h4>
      {isDealerMember && <h3 className="member__dealer">Dealer</h3>}
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
