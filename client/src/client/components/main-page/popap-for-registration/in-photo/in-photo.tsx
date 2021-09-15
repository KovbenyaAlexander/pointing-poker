import React, { ReactElement } from 'react';

interface IInPhoto{
  photoUser: string | ArrayBuffer | null | undefined
}

export const InPhoto = ({ photoUser }:IInPhoto):ReactElement => (
  <div
    className="in_photo"
    style={{
      backgroundImage: `url(${photoUser})`,
      backgroundSize: 'contain',
      backgroundPosition: 'center',
    }}
  />
);
