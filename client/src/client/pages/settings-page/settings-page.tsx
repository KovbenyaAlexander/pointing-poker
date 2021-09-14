import React, { useEffect } from 'react';
import './style.scss';
import { useDispatch } from 'react-redux';
import { createGame } from '../../store/thunk';
import Settings from './settings';
import Launch from './launch';

export default function SettingsPage(): JSX.Element {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(createGame());
  }, []);

  return (
    <div className="settings-page">
      <Settings />
      <hr />
      <Launch />
    </div>
  );
}
