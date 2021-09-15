import React from 'react';
import { useSelector } from 'react-redux';
import Navigation from './navigation/navigation';

import './style.scss';

export default function Header() {
  const { dataUser } = useSelector((dataUserSelector:any) => dataUserSelector);
  const { lastName, firstName, photoUser } = dataUser;

  const styleAvatarBlock = {
    backgroundImage: `url('${photoUser}')`,
    width: '40px',
    height: '40px',
    borderRadius: '40px',
    backgroundSize: 'contain',
    backgroundPosition: 'center',
  };
  return (
    <header className="header">
      <Navigation />
      {!photoUser ? ''
        : (<div className="avatar" style={styleAvatarBlock} />)}
      <p>
        {lastName}
        {' '}
        {!firstName ? '' : firstName}
      </p>
    </header>
  );
}
