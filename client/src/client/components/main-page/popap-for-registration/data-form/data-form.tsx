import React, { useState } from "react";

interface IDataForm{
  dataUser: {
    firstName: string;
    setFirstName: React.Dispatch<React.SetStateAction<string>>;
    lastName: string;
    setLastName: React.Dispatch<React.SetStateAction<string>>;
    jobPosition: string;
    setJobPosition: React.Dispatch<React.SetStateAction<string>>;
},
error: {
  errorFirstName: string;
  setErrorFirstName: React.Dispatch<React.SetStateAction<string>>;
}
valid: React.Dispatch<React.SetStateAction<boolean>>
}

export const DataForm = ({dataUser, valid, error}:IDataForm) => {





  function handleChangeFirstName(e: React.ChangeEvent<HTMLInputElement>){
    dataUser.setFirstName(e.target.value)

  }
  function handleChangeLastName(e: React.ChangeEvent<HTMLInputElement>){
    dataUser.setLastName(e.target.value)
  }
  function handleChangeJobPosition(e: React.ChangeEvent<HTMLInputElement>){
    dataUser.setJobPosition(e.target.value)
  }



  return (
    <form className="data-user-form">
      <label htmlFor="firstName">
        <p>First Name: </p>
        <input 
        type="text" 
        id="firstName"
        value ={dataUser.firstName} 
        onChange ={(e) => handleChangeFirstName(e)}/>

       <p>{error.errorFirstName}</p> 
      </label>
      <label htmlFor="firstName">
        <p>Last Name:</p> 
        <input 
        type="text" 
        id="lastName"
        value ={dataUser.lastName} 
        onChange ={(e) => handleChangeLastName(e)}
        onBlur ={() => valid(true)}/>
      </label>
      <label htmlFor="jobPosition">
        <p>Job Position:</p>
        <input 
        type="text" 
        id="jobPosition"
        value ={dataUser.jobPosition} 
        onChange ={(e) => handleChangeJobPosition(e)}/>
      </label>
    </form>
  );
};
