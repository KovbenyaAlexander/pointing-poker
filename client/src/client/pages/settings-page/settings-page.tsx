import React, { useEffect } from 'react';
import './style.scss';
import { useDispatch, useSelector } from 'react-redux';
import { newGame } from '../../store/thunk';
import { IStore } from '../../store/types/store-types';

export default function SettingsPage(): JSX.Element {
  const dispatch = useDispatch();
  const { id, name } = useSelector((state: IStore) => ({
    name: state.user.name,
    id: state.settings.id,
  }));

  useEffect(() => {
    dispatch(newGame());
  }, []);

  return (
    <div className="settings-page">

      Room id:
      {id}
      <br />
      Your name:
      {name}

    </div>
  );
}
