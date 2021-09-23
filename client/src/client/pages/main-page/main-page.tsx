import React, { ReactElement, useEffect, useState } from "react";
import { LoginPopap } from "../../components/login-popap/login-popap";
import "./style.scss";
import NewUserFrom from "../../components/new-user-form/new-user-form";
import { isGameActive } from "../../store/thunk";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../types";

const MainPage = (props: any): ReactElement => {
  const dispatch: AppDispatch = useDispatch();
  const { gameId }: any = props.match.params;
  const [keyID, setKeyID] = useState(gameId || "");
  const [shouldShowLogin, setShouldShowLogin] = useState(false);
  const [isGameFound, setIsGameFound] = useState(false);




  return (
    <article>
      {shouldShowLogin  && <LoginPopap statePopap={setShouldShowLogin} />}
      <section>
        <NewUserFrom />
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

          <button
            type="button"
            onClick={async () =>
              dispatch(isGameActive(keyID))
                .then((res: any) =>{
                  setShouldShowLogin(res)
                  setIsGameFound(res)
                })
                .catch((e) => console.log(e))
            }
          >
            Play
          </button>
        </form>
        {!isGameFound && <p>Game not found...</p>}
      </section>
    </article>
  );
};
export default MainPage;
