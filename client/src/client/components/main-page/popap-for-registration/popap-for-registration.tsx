import React, { ReactElement, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { InPhoto } from './in-photo/in-photo';
import { DataForm } from './data-form/data-form';
import { WithoutPhoto } from './without-photo/without-photo';
import { DataUserActions } from '../../../store/actions';
import { IDataUser } from '../../../store/types/store-types';
import './style.sass';

interface PopapState {
  statePopap: React.Dispatch<React.SetStateAction<boolean>>;
  data: {
    firstName: string;
    lastName: string;
    jobPosition: string;
    photoUser: string | ArrayBuffer | null | undefined;
  };
  setData: {
    setFirstName: React.Dispatch<React.SetStateAction<string>>;
    setLastName: React.Dispatch<React.SetStateAction<string>>;
    setJobPosition: React.Dispatch<React.SetStateAction<string>>;
    setPhotoUser: React.Dispatch<
    React.SetStateAction<string | ArrayBuffer | null | undefined>
    >;
  };
}

// any - 3

export const PopapForRegistration = ({
  statePopap,
  data,
  setData,
}: PopapState):ReactElement => {
  const host = 'http://localhost:5000/api';

  const {
    firstName, lastName, photoUser, jobPosition,
  } = data;
  const {
    setFirstName, setLastName, setJobPosition, setPhotoUser,
  } = setData;

  const [errorFirstName, setErrorFirstName] = useState('');
  const [validForm, setValidForm] = useState(false);

  const dispatch = useDispatch();

  async function sendUserServer(person: IDataUser) {
    await fetch(`${host}/newsUser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(person),
    })
      .then((res) => {
        if (!res.status) {
          console.log('error');
        }
      });
  }

  async function fetchPersonData() {
    const res = await fetch(`${host}/getUser`);

    const user = await res.json();

    dispatch(DataUserActions({ ...user }));
  }

  function checkedErrorForm() {
    const reg = /([a-z]{1,20})\w+/;

    if (!reg.test(String(firstName).toLowerCase())) {
      setErrorFirstName('Emty strinf our invalid characters');
      setValidForm(false);
    } else if (firstName.length >= 20) {
      setErrorFirstName('more symbal');
      setValidForm(false);
    } else {
      setErrorFirstName('');
      setValidForm(true);
    }
  }

  function handlerNewUserPhoto(e: React.ChangeEvent<any>):void {
    const file = e.target.files[0];

    const render = new FileReader();

    render.onload = (event) => {
      setPhotoUser(event.target?.result);
    };

    render.readAsDataURL(file);
  }

  function handlerClickCancel(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    statePopap(false);
  }

  function handlerClickConfirm(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    // ?
    window.location.href = '#/settings';

    statePopap(false);
    const allDataUser = {
      firstName,
      lastName,
      jobPosition,
      photoUser,
    };

    sendUserServer({ ...allDataUser });
    fetchPersonData();
  }

  useEffect(() => {
    if (firstName) {
      checkedErrorForm();
    }
  }, [firstName, lastName, jobPosition, photoUser]);

  return (
    <div className="popap-window">
      <div className="popap-container">
        <h3>Registr</h3>
        <div className="wrapper-forms">
          <form className="photo-user-form">
            <label htmlFor="file">
              {!photoUser ? (
                <WithoutPhoto />
              ) : (
                <InPhoto photoUser={photoUser} />
              )}

              <input
                id="file"
                type="file"
                accept=".png, jpg, .jpeg"
                onChange={(e) => handlerNewUserPhoto(e)}
              />
            </label>
          </form>
          <DataForm
            dataUser={{
              firstName,
              setFirstName,
              lastName,
              setLastName,
              jobPosition,
              setJobPosition,
            }}
            error={{ errorFirstName, setErrorFirstName }}
          />
        </div>
        <div className="btn-container">

          <button
            type="button"
            onClick={(e) => handlerClickConfirm(e)}
            className="confirm"
            disabled={!validForm}
          >
            Confirm
          </button>

          <button
            type="button"
            onClick={(e): void => handlerClickCancel(e)}
            className="closes"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
