import React, { Dispatch, SetStateAction, useDebugValue, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { UpdateUser } from "../../store/actions";

import "./style.scss";

interface ILoginPopap {
  statePopap: Dispatch<SetStateAction<boolean>>;
}

// const url = "http://localhost:5000/api";

export const LoginPopap = ({ statePopap }: ILoginPopap) => {
  const dispatch = useDispatch()

  const {keyID} = useSelector((s:any) => s.idKey)
  
  const [stateDataUser, setStateDataUser] = useState({
    firstName: "",
    validFirstName: false,
    defaultCheckbox: true,
    errorMessage: "",
    lastName: "",
    jobPosition: "value1",
    role: "player",
    photoUser: "",
    gameActive: 'game'
  });

  const {
    firstName,
    lastName,
    jobPosition,
    photoUser,
    defaultCheckbox,
    role,
    validFirstName,
    errorMessage,
    gameActive
  } = stateDataUser;


  useEffect(() => {
    function checkedValidFirstName() {

      const reg = /([a-z])\w+/;

      if (!reg.test(String(stateDataUser.firstName).toLowerCase())) {
        setStateDataUser({
          ...stateDataUser,
          validFirstName: true,
          errorMessage: "Wrong data...",
        });
      } else {
        setStateDataUser({
          ...stateDataUser,
          validFirstName: false,
          errorMessage: "",
        });
      }
    }
    checkedValidFirstName();
  }, [firstName, lastName, jobPosition, role, photoUser]);

  function getUserDataValue(
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) {
    setStateDataUser({ ...stateDataUser, [e.target.name]: e.target.value });
  }

  function addedPhotoUser(e: React.ChangeEvent<any>) {
    const file = e.target.files[0];

    const render = new FileReader();

    render.onload = (event) => {
      setStateDataUser({
        ...stateDataUser,
        [e.target.name]: event.target?.result,
      });
    };

    render.readAsDataURL(file);
  }

// 

async function sendDataUser() {
  dispatch(UpdateUser({
    firstName,
    lastName,
    jobPosition,
    photoUser,
    role
  }))


}
// 
  return (
    <div className="login_popap">
      <div className="login_popap-wrapper">
        <h2>Login Popap</h2>
        <form>
          <div className="photo_user-wrapper">
            <label htmlFor="photoUser">
              {!photoUser ? (
                <p>Added photo</p>
              ) : (
                <img
                  src={photoUser}
                  alt={firstName && (firstName)}
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
          <label htmlFor="firstName">
            <p>First Name:</p>
            <input
              type="text"
              name="firstName"
              id="firstName"
              value={firstName}
              onChange={(e) => getUserDataValue(e)}
            />
            <p>{errorMessage}</p>
          </label>

          <label htmlFor="lastName">
            <p>Last Name:</p>
            <input
              type="text"
              name="lastName"
              id="lastName"
              value={lastName}
              onChange={(e) => getUserDataValue(e)}
            />
          </label>

          <label htmlFor="jobPosition">
            <p>Job Position:</p>
            <select
              id="jobPosition"
              name="jobPosition"
              onChange={(e) => getUserDataValue(e)}
            >
              <option value="value1">value1</option>
              <option value="value2">value2</option>
              <option value="value3">value3</option>
              <option value="value4">value4</option>
              <option value="value5">value5</option>
            </select>
          </label>
          <label htmlFor="isRole">
            <p>You observer?</p>
            <input 
            type="checkbox" 
            name="isRole"
            id="isRole" />
          </label>
          <div className="btn_wrapper">

            <NavLink to={`/${gameActive}/${keyID}`}>
            <button 
            type="submit" 
            disabled={validFirstName} 
            onClick={()=> sendDataUser()}>
              Check Button
            </button>
            </NavLink>

            <button 
            type="button" 
            onClick={() => statePopap(false)}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
