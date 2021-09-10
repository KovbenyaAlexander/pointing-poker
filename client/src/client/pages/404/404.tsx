import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { IStore } from '../../store/types/store-types';
import './style.scss';

export default function NotFound(): JSX.Element {
  const user = useSelector((state: IStore) => state.user);

  return (
    <article className="not-found">
      <h2 className="not-found__title">
        404, sorry page doesn$
        {'&apos;'}
        t exist
      </h2>
      <p>
        Current User -
        {user.name}
      </p>
      <Link to="/">Go Home</Link>
    </article>
  );
}
