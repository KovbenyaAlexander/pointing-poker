import React, { ReactElement, useState } from 'react';
import { JoinToGameOnLink } from './join-to-game-form/join-to-game-form';
import { BtnForPopap } from './btn-for-popap/btn-for-popap';
import { PopapForRegistration } from './popap-for-registration/popap-for-registration';

export const ContentHelloPage = ():ReactElement => {
  const [statePopap, setStatePopap] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [jobPosition, setJobPosition] = useState('');

  const [photoUser, setPhotoUser] = useState<
  string | ArrayBuffer | null | undefined
  >('');
  return (
    <article>
      <section>
        <h2 className="new-game__title">Create New Game!</h2>
        <BtnForPopap statePopap={setStatePopap} />
      </section>
      <h2 className="hello-page__separator">OR</h2>
      <section>
        <JoinToGameOnLink statePopap={setStatePopap} />
      </section>
      {statePopap ? (
        <PopapForRegistration
          statePopap={setStatePopap}
          data={{
            firstName, lastName, jobPosition, photoUser,
          }}
          setData={{
            setFirstName, setLastName, setJobPosition, setPhotoUser,
          }}
        />
      ) : (
        ''
      )}
    </article>
  );
};
