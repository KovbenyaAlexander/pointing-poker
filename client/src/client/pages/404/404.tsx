import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { UpdateUser } from '../../store/actions';
import { IStore } from '../../types/store-types';
import './style.scss';

export default function NotFound(): JSX.Element {
  const state = useSelector((store: IStore) => store);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(UpdateUser({
      userID: '1',
      name: 'Lucy',
      role: 'dealer',
    }));
  }, []);

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
        {state.settings.time}
      </p>
      <Link to="/">Go Home</Link>
    </article>
  );
}
