import React from "react";
import { useSelector } from "react-redux";
import "./style.scss";

export default function GamePage(): JSX.Element {
  const { user } = useSelector((store: any) => store);
  const store = useSelector((store: any) => store);
  console.log(store)
  return (
    <article className="game">
      <h2 className="game__title">There are all your games</h2>
      <p>{window.location.hash}</p>
      <p>first name: {user.name}</p>
      {user.lastName && (<p> last name: {user.lastName}</p>)}
      <p>job position {user.jobPosition}</p>
      {user.photoUser && (
        <img
          src={user.photoUser}
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "50px",
          }}
        />
      )}
    </article>
  );
}
