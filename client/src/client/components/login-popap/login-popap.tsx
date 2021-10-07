import React, { useEffect, useState } from 'react';
import './login-popap.scss';

interface ILoginPopap {
  onClose: () => void;
  onSubmit: (data: any) => void;
  isDealer?: boolean;
}

interface IUserForm {
  name: string;
  lastName: string;
  jobPosition: string;
  role: string;
  photoUser: File | undefined,
}

export const LoginPopap = ({ onClose, onSubmit, isDealer }: ILoginPopap):JSX.Element => {
  const [isFormValid, setIsFormValid] = useState(true);
  const [userForm, setUserForm] = useState<IUserForm>({
    name: '',
    lastName: '',
    jobPosition: 'value1',
    role: isDealer ? 'dealer' : 'player',
    photoUser: undefined,
  });

  function addedPhotoUser(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const file = e.target.files[0];
      const render = file;
      setUserForm({
        ...userForm,
        photoUser: render,
      });
    }
  }

  useEffect(() => {
    const reg = /^[a-z, а-я, 0-9]+$/i;
    if (!reg.test(String(userForm.name).toLowerCase())) {
      setIsFormValid(false);
    } else {
      setIsFormValid(true);
    }
  }, [userForm.name]);

  function onObserverChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setUserForm((prev) => ({ ...prev, role: e.target.checked ? 'observer' : 'player' }));
  }

  return (
    <div className="login_popap">
      <div className="login_popap-wrapper">
        <h2>Login Popap</h2>
        <form onSubmit={() => onSubmit(userForm)}>
          <div className="photo_user-wrapper">
            <label htmlFor="photoUser">
              {!userForm.photoUser ? (
                <p>Added photo</p>
              ) : (
                <img
                  src={URL.createObjectURL(userForm.photoUser)}
                  alt={userForm.name && userForm.name}
                />
              )}

              <input
                type="file"
                name="photoUser"
                id="photoUser"
                accept=".png, jpg, .jpeg"
                onChange={(e) => addedPhotoUser(e)}
              />
            </label>
          </div>
          <label htmlFor="name">
            <p>First Name:*</p>
            <input
              type="text"
              name="name"
              id="name"
              value={userForm.name}
              onChange={(e) => setUserForm({ ...userForm, name: e.target.value })}
            />
          </label>

          <label htmlFor="lastName">
            <p>Last Name:</p>
            <input
              type="text"
              name="lastName"
              id="lastName"
              value={userForm.lastName}
              onChange={(e) => setUserForm({ ...userForm, lastName: e.target.value })}
            />
          </label>

          <label htmlFor="jobPosition">
            <p>Job Position:</p>
            <select
              id="jobPosition"
              name="jobPosition"
              onChange={(e) => setUserForm({ ...userForm, jobPosition: e.target.value })}
            >
              <option value="value1">value1</option>
              <option value="value2">value2</option>
              <option value="value3">value3</option>
            </select>
          </label>
          {!isDealer && (
            <label htmlFor="isRole">
              <p>You observer?</p>
              <input type="checkbox" name="isRole" id="isRole" onChange={onObserverChange} />
            </label>
          )}
          <div className="btn_wrapper">
            <button type="submit" disabled={!isFormValid} className="button button_green">
              GO
            </button>

            <button type="button" onClick={onClose} className="button button_red">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
