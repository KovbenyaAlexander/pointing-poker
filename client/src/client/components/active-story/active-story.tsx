import React from 'react';
import {  IStory } from '../../types';
import './style.scss';


export default function ActiveStory({story}: any): JSX.Element {

  console.log(story)

  return (
      <div className="active-story">
        <h3>Active story</h3>
        <p>
          name:
          {story.name}
        </p>
        <p>
          description:
          {story.description}
        </p>
        <hr />
      </div>
  );
}
