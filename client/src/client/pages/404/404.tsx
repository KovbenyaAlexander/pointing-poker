import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { IStore } from '../../types/store-types';
import './style.scss';

export default function NotFound(): JSX.Element {
  const state = useSelector((store: IStore) => store);

  return (
    <article className="not-found">
      <h2 className="not-found__title">
        404, sorry page doesnt exist
      </h2>
      <p>
        Current User -
        {state.user.name}
      </p>
      <p>
        Current time -
      </p>
      <Link to="/">Go Home</Link>
    </article>
  );
}
