import React from 'react';
import { useSelector } from 'react-redux';
import { IStore } from '../../types/store-types';
import Member from '../member/member';
import './style.scss';

export default function MemberList(): JSX.Element {
  const game = useSelector((state: IStore) => state.game);

  return (
    <section className="members">
      <h3 className="members__header">Members</h3>
      <ul className="members__list">
        {
          game.members.map((member) => (
            <Member key={member.userID} user={member} />
          ))
        }
      </ul>
    </section>
  );
}
