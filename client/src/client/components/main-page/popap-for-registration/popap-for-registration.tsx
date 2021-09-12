import React, { useEffect, useState } from "react";
import { WithoutPhoto } from "./without-photo/without-photo";
import "./style.sass";
import { InPhoto } from "./in-photo/in-photo";
import { DataForm } from "./data-form/data-form";

interface PopapState {
  statePopap: React.Dispatch<React.SetStateAction<boolean>>;
}

// any - 3

export const PopapForRegistration = ({ statePopap }: PopapState) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [jobPosition, setJobPosition] = useState("");
  const [imgUser, setImgUser] = useState<
    string | ArrayBuffer | null | undefined
  >("");
  const [errorFirstName, setErrorFirstName] = useState("")

  const [validForm, setValidForm] = useState(false)

  function handlerNewUserPhoto(e: React.ChangeEvent<EventTarget | any>) {
    const file = e.target.files[0];

    const render = new FileReader();

    render.onload = (event) => {
      setImgUser(event.target?.result);
    };

    render.readAsDataURL(file);
  }

  function handlerClickCancel(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    statePopap(false);
  }

  function handlerClickConfirm(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    statePopap(false);

    const allDataUser = {
      firstName,
      lastName,
      jobPosition,
      imgUser
    }
    // return <Redirect to="/game"/>
    console.log(allDataUser)
  }


  useEffect(()=>{
    if(errorFirstName) {
      setValidForm(true)
    }else{
      setValidForm(false)
    }
  }, [errorFirstName])
  
  console.log(validForm)
  return (
    <div className="popap-window">
      <div className="popap-container">
        <h3>Registr</h3>
        <div className="wrapper-forms">
          <form className="photo-user-form">
            <label htmlFor="file">
              {!imgUser ? <WithoutPhoto /> : <InPhoto photoUser={imgUser} />}

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
            valid ={setValidForm}
            error={{errorFirstName, setErrorFirstName}}
          />
        </div>
        <div className="btn-container">
          <button
           onClick={(e) => handlerClickConfirm(e)}
            className="confirm"
            disabled = {validForm}
            >
            Confirm
          </button>
          <button
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
