import React from 'react';
import { useSelector } from 'react-redux';
import { IStore } from '../../types/store-types';
import { isCurrentUser, isDealer } from '../../utils';
import Avatar from '../avatar/avatar';
import './style.scss';

export default function Member({
  name,
  imgSrc,
  userID,
} : {
  name: string,
  userID: string,
  imgSrc: string | undefined
}): JSX.Element {
  const store = useSelector((state: IStore) => state);
  const isExludable = !isDealer(store, userID) && !isCurrentUser(store, userID);
  return (
    <figure className="member">
      <Avatar name={name} imgSrc={imgSrc} />
      <h4>{ name }</h4>
      { isExludable && <button type="button">Exlude</button> }
    </figure>
  );
}
