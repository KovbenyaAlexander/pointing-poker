import React from 'react';
import { useSelector } from 'react-redux';
import { IStore } from '../../types/store-types';
import Member from '../member/member';
import './style.scss';

export default function MemberList(): JSX.Element {
  const store: IStore = useSelector((state: IStore) => state);

  return (
    <section className="members">
      <h3 className="members__header">Members</h3>
      <ul className="members__list">
        {
          store.game.members.map((member) => {
            if (member.role === 'dealer') return '';
            return (
              <Member
                key={member.userID}
                name={member.name}
                imgSrc={member.imgSrc}
                userID={member.userID}
              />
            );
          })
        }
      </ul>
    </section>
  );
}
