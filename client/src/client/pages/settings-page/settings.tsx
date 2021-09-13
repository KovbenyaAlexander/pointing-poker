import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UpdateSettings } from '../../store/actions';
import { IStore } from '../../store/types/store-types';
import './style.scss';

export default function Settings(): JSX.Element {
  const dispatch = useDispatch();
  const settings = useSelector((s:IStore) => ({
    gameName: s.settings.gameName,
    isDealerInGame: s.settings.isDealerInGame,
    isAutoEntry: s.settings.isAutoEntry,
    isAutoFinish: s.settings.isAutoFinish,
    isVoteMutable: s.settings.isVoteMutable,
    estimationType: s.settings.estimationType,
    isTimerRequired: s.settings.isTimerRequired,
    timerValue: s.settings.timerValue,
  }));

  return (
    <div className="settings-page">
      <span>Name of game</span>
      <input
        type="text"
        minLength={2}
        value={settings.gameName}
        onChange={(e) => dispatch(UpdateSettings({ gameName: e.target.value }))}
      />

      <br />

      <span>Dealer in game</span>
      <input
        type="checkbox"
        checked={settings.isDealerInGame}
        onChange={(e) => { dispatch(UpdateSettings({ isDealerInGame: e.target.checked })); }}
      />

      <br />

      <span>Auto entry</span>
      <input
        type="checkbox"
        checked={settings.isAutoEntry}
        onChange={(e) => { dispatch(UpdateSettings({ isAutoEntry: e.target.checked })); }}
      />

      <br />

      <span>Auto finish</span>
      <input
        type="checkbox"
        checked={settings.isAutoFinish}
        onChange={(e) => { dispatch(UpdateSettings({ isAutoFinish: e.target.checked })); }}
      />

      <br />

      <span>Allow change vote</span>
      <input
        type="checkbox"
        checked={settings.isVoteMutable}
        onChange={(e) => { dispatch(UpdateSettings({ isVoteMutable: e.target.checked })); }}
      />

      <br />

      <p>Estimation Type</p>
      <label htmlFor="single">
        Power of number 2
        <input
          type="radio"
          name="Estimation"
          id="PowerOf2"
          checked={settings.estimationType === 'power2'}
          onChange={() => { dispatch(UpdateSettings({ estimationType: 'power2' })); }}
        />
      </label>

      <br />

      <label htmlFor="single">
        Fibonacci numbers
        <input
          type="radio"
          name="Estimation"
          id="Fibonacci"
          checked={settings.estimationType === 'fibonacci'}
          onChange={() => { dispatch(UpdateSettings({ estimationType: 'fibonacci' })); }}
        />
      </label>

      <br />

      <span>Timer </span>
      <input
        type="checkbox"
        checked={settings.isTimerRequired}
        onChange={(e) => { dispatch(UpdateSettings({ isTimerRequired: e.target.checked })); }}
      />
      <br />
      {settings.isTimerRequired
   && (
     <label htmlFor="appt-time">
       Choose time:
       <input
         id="appt-time"
         type="time"
         value={settings.timerValue}
         onChange={(e) => { dispatch(UpdateSettings({ timerValue: e.target.value })); }}
       />
     </label>
   )}
    </div>
  );
}
