import React from 'react';
import Navigation from './navigation/navigation';

import './style.scss';

export default function Header(): JSX.Element {
  return (
    <header className="header">
      <Navigation />
    </header>
  );
}
