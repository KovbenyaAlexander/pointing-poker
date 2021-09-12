import React from "react";


export const InPhoto = ({photoUser}:any) =>{
  return(
    <div className="in_photo" style={{
      backgroundImage: `url(${photoUser})`,
      backgroundSize: "contain",
      backgroundPosition: "center",
    }}></div>
  )
}