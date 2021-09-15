import React, { useEffect, useState } from "react";
import { WithoutPhoto } from "./without-photo/without-photo";
import "./style.sass";
import { InPhoto } from "./in-photo/in-photo";
import { DataForm } from "./data-form/data-form";
import { useDispatch, useSelector } from "react-redux";
import { DataUserActions } from "../../../store/types/data-user-reducer.ts/data-user";

interface PopapState {
  statePopap: React.Dispatch<React.SetStateAction<boolean>>;
}

// any - 3

export const PopapForRegistration = ({ statePopap }: PopapState) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [jobPosition, setJobPosition] = useState("");
  const [errorFirstName, setErrorFirstName] = useState("")

  const [photoUser, setPhotoUser] = useState<
    string | ArrayBuffer | null | undefined
  >("");
  const [validForm, setValidForm] = useState(false)
  
  const dispatch = useDispatch();
  const  {dataUser}  = useSelector((dataUserSelector:any) => dataUserSelector)



  

  function checkedErrorForm() {
    const reg = /([a-z]{1,20})\w+/;

    
     if(!reg.test(String(firstName).toLowerCase())) {
      setErrorFirstName("Emty strinf our invalid characters")
      setValidForm(false)
    } else if(firstName.length >= 20) {
      setErrorFirstName('more symbal')
      setValidForm(false)

    }
    else{
      setErrorFirstName('');
      setValidForm(true)

      
    }

  }

  

  function handlerNewUserPhoto(e: React.ChangeEvent<EventTarget | any>) {
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

    statePopap(false);
    const allDataUser = {
      firstName,
      lastName,
      jobPosition,
      photoUser
    }
    dispatch(DataUserActions({...allDataUser}))

  }
  console.log(dataUser)


  useEffect(()=>{
    if(firstName){

      checkedErrorForm()
    }
  }, [firstName])
  
  return (
    <div className="popap-window">
      <div className="popap-container">
        <h3>Registr</h3>
        <div className="wrapper-forms">
          <form className="photo-user-form">
            <label htmlFor="file">
              {!photoUser ? <WithoutPhoto /> : <InPhoto photoUser={photoUser} />}

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
            disabled = {!validForm}
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
