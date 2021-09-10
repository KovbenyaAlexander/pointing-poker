import React from 'react';
import JoinToGameForm from '../../components/join-to-game-form/join-to-game-form';
import NewUserFrom from '../../components/new-user-form/new-user-form';
import './style.scss';

export default function HelloPage(): JSX.Element {
  return (
    <article className="hello-page">
      <section className="hello-page__new-game new-game">
        <h2 className="new-game__title">Create New Game!</h2>
        <NewUserFrom />
      </section>
      <h2 className="hello-page__separator">OR</h2>
      <section className="hello-page__join join">
        <h2 className="join__title">Join Game!</h2>
        <JoinToGameForm />
      </section>
    </article>
  );
}