import React, { useEffect, useState } from 'react';
import './login-popap.scss';

interface ILoginPopap {
  onClose: () => void;
  onSubmit: (data: any) => void;
  isDealer?: boolean;
}

export const LoginPopap = ({ onClose, onSubmit, isDealer }: ILoginPopap):JSX.Element => {
  const [isFormValid, setIsFormValid] = useState(true);
  const [userForm, setUserForm] = useState({
    name: '',
    lastName: '',
    jobPosition: 'junior',
    role: isDealer ? 'dealer' : 'player',
    photoUser: '',
  });

  function addedPhotoUser(e: React.ChangeEvent<any>) {
    const file = e.target.files[0];

    const render = new FileReader();

    render.onload = (event) => {
      setUserForm({
        ...userForm,
        [e.target.name]: event.target?.result,
      });
    };

    render.readAsDataURL(file);
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
    <div className="login_popup">
      <div className="login_popup-wrapper">
        <form onSubmit={() => onSubmit(userForm)}>

          <div className="login_popup__form-wrapper">
            <div className="login_popup__inputs">
              <label htmlFor="name">
                <p>First Name:</p>
                <input
                  className="input"
                  type="text"
                  name="name"
                  id="name"
                  value={userForm.name}
                  onChange={(e) => setUserForm({ ...userForm, name: e.target.value })}
                />
              </label>

              <label htmlFor="lastName">
                <p>Last Name (Optional):</p>
                <input
                  className="input"
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
                  className="input"
                  id="jobPosition"
                  name="jobPosition"
                  onChange={(e) => setUserForm({ ...userForm, jobPosition: e.target.value })}
                >
                  <option value="junior">junior</option>
                  <option value="middle">middle</option>
                  <option value="senior">senior</option>
                </select>
              </label>
            </div>

            <div className="login_popup__photo">
              <label htmlFor="photoUser">
                {!userForm.photoUser ? (
                  <p>Upload photo</p>
                ) : (
                  <img
                    src={userForm.photoUser}
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
          </div>

          {!isDealer && (
            <div className="login_popup__observer-container">
              <label htmlFor="isRole">
                <input type="checkbox" name="isRole" id="isRole" onChange={onObserverChange} />
                <span>Observer?</span>
              </label>
            </div>
          )}

          <div className="btn_wrapper">
            <button type="submit" disabled={!isFormValid} className="button button_green login_popup__button">
              GO
            </button>

            <button type="button" onClick={onClose} className="button button_red login_popup__button">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
