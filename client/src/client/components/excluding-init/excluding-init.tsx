import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { StartExclude, StopExlude } from '../../store/actions';
import { IExclude, IUserInfo } from '../../types/store-types';
import './style.scss';

export default function ExcludingInit({ user, close }
: { user: IUserInfo, close: React.Dispatch<React.SetStateAction<boolean>> }): JSX.Element {
  const dispatch = useDispatch();
  const [reason, setReason] = useState('');

  function handleConfirm(): void {
    const exclude: IExclude = {
      isActive: true,
      user,
      reason,
    };
    dispatch(StartExclude(exclude));
    dispatch(StopExlude('yes'));
    close(false);
  }

  function handleCancel(): void {
    close(false);
  }
  return (
    <div>
      <h2>Are you sure about a member excluding? Please give a reason: </h2>
      <input
        type="text"
        value={reason}
        onChange={(e) => {
          e.preventDefault();
          setReason(e.target.value);
        }}
      />
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          handleConfirm();
        }}
      >
        Yes
      </button>
      <button
        type="button"
        onClick={async (e) => {
          e.preventDefault();
          await handleCancel();
        }}
      >
        No
      </button>
    </div>
  );
}
