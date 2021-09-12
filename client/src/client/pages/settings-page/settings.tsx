import React, { useState } from 'react';
import './style.scss';

export default function Settings(): JSX.Element {
  const [settingsState, setSettingsState] = useState({
    gameName: '',
    isDealerInGame: false,
    isAutoEntry: false,
    isAutoFinish: false,
    isVoteMutable: false,
    estimationType: 'power2',
    isTimerКequired: false,
    timerValue: '00:01',
  });

  console.log(settingsState);

  return (
    <div className="settings-page">
      <span>Name of game</span>
      <input
        type="text"
        onChange={(e) => setSettingsState(() => ({ ...settingsState, gameName: e.target.value }))}
      />

      <br />

      <span>Dealer in game</span>
      <input
        type="checkbox"
        checked={settingsState.isDealerInGame}
        onChange={() => setSettingsState(() => ({ ...settingsState, isDealerInGame: !settingsState.isDealerInGame }))}
      />

      <br />

      <span>Auto entry</span>
      <input
        type="checkbox"
        checked={settingsState.isAutoEntry}
        onChange={() => setSettingsState(() => ({ ...settingsState, isAutoEntry: !settingsState.isAutoEntry }))}
      />

      <br />

      <span>Auto finish</span>
      <input
        type="checkbox"
        checked={settingsState.isAutoFinish}
        onChange={() => setSettingsState(() => ({ ...settingsState, isAutoFinish: !settingsState.isAutoFinish }))}
      />

      <br />

      <span>Allow change vote</span>
      <input
        type="checkbox"
        checked={settingsState.isVoteMutable}
        onChange={() => setSettingsState(() => ({ ...settingsState, isVoteMutable: !settingsState.isVoteMutable }))}
      />

      <br />

      <p>Estimation Type</p>
      <label htmlFor="single">
        Power of number 2
        <input
          type="radio"
          name="Estimation"
          id="PowerOf2"
          checked={settingsState.estimationType === 'power2'}
          onChange={() => setSettingsState(() => ({ ...settingsState, estimationType: 'power2' }))}
        />
      </label>

      <br />

      <label htmlFor="single">
        Fibonacci numbers
        <input
          type="radio"
          name="Estimation"
          id="Fibonacci"
          checked={settingsState.estimationType === 'fibonacci'}
          onChange={() => setSettingsState(() => ({ ...settingsState, estimationType: 'fibonacci' }))}
        />
      </label>

      <br />

      <span>Timer </span>
      <input
        type="checkbox"
        checked={settingsState.isTimerКequired}
        onChange={() => setSettingsState(() => ({ ...settingsState, isTimerКequired: !settingsState.isTimerКequired }))}
      />
      <br />
      {settingsState.isTimerКequired
   && (
     <label htmlFor="appt-time">
       Choose an appointment time:
       <input
         id="appt-time"
         type="time"
         value={settingsState.timerValue}
         onChange={(e) => setSettingsState(() => ({ ...settingsState, timerValue: e.target.value }))}
       />
     </label>
   )}
    </div>
  );
}
