import React from 'react';
import './style.scss';

export default function Avatar({ name, imgSrc }: { name: string, imgSrc: string | undefined }): JSX.Element {
  return (
    imgSrc ? <img src={imgSrc} alt={`member - ${name}`} /> : <div><p>{name[0]}</p></div>
  );
}
