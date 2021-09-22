import React, { ReactElement, useState } from "react";
import { LoginPopap } from "../../components/login-popap/login-popap";
import "./style.scss";
import NewUserFrom from "../../components/new-user-form/new-user-form";
import { isGameActive } from "../../store/thunk";

const url = "http://localhost:5000/api";

const MainPage = (props: any): ReactElement => {
  const { gameId }: any = props.match.params;
  const [keyID, setKeyID] = useState(gameId || "");


  const [shouldShowLogin, setShouldShowLogin] = useState(false);
  const [isGameFound, setIsGameFound] = useState(false);


async function checkedByID() {
 if(await isGameActive(keyID)){
  setShouldShowLogin(true)
  setIsGameFound(true)
 }
}


  return (
    <article>
      {shouldShowLogin && <LoginPopap statePopap={setShouldShowLogin} />}
      <section>

          <NewUserFrom/>
      </section>
      <h2 className="main-page__separator">OR</h2>
      <section>
        <p>Connect to lobby by URL: </p>
        <form>

          <input
            type="text"
            value={keyID}
            onChange={(e) => setKeyID(e.target.value)}
          />

          <button type="button" onClick ={()=> checkedByID()}>
            Play
          </button>
        </form>
        {!isGameFound && (
    <p>Game not found...</p>
)}
      </section>
    </article>
  );
};
export default MainPage