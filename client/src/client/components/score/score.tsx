import React from 'react';
import { IUserInfo } from '../../types';
import './style.scss';

export default function Score({ member } : { member: IUserInfo }): JSX.Element {
  return (
    <section className="score">
      {member.role === 'observer' ? <p>Observer</p> : (
        <p>{member.choose || 'Think...'}</p>
      )}
    </section>
  );
}
