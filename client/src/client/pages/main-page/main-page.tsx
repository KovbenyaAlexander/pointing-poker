import React, { ReactElement, useCallback, useEffect, useState } from "react";
import { LoginPopap } from "../../components/login-popap/login-popap";
import { isGameActive } from "../../store/thunk";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../types";
import { UpdateUser } from "../../store/actions";
import { useHistory } from "react-router";
import "./style.scss";

const MainPage = (props: any): ReactElement => {
  const dispatch: AppDispatch = useDispatch();
  const { isActive } = useSelector((sel: any) => sel.game);
  const { gameId }: any = props.match.params;
  const [keyID, setKeyID] = useState(gameId || "");
  const [shouldShowLogin, setShouldShowLogin] = useState(false);
  const [isGameFound, setIsGameFound] = useState(false);
  const [dealerLogin, setIsDealerLogin] = useState(true);
  const history = useHistory();

  const onLoginDealer = useCallback(
    (data) => {
      dispatch(UpdateUser({...data}));
      history.push("settings");
      console.log(data)
    },
    [dispatch, history]
  );

  const onLoginPlayer = useCallback(
    (data) => {
      dispatch(UpdateUser({...data}));
      history.push(isActive ? `game/${keyID}` : ` lobby/${keyID}`);
    },
    [dispatch, history, isActive, keyID]
  );

  const onPlay = useCallback(() => {
    dispatch(isGameActive(keyID))
      .then((res:any) => {
        if (res) {
          setShouldShowLogin(true);
          setIsDealerLogin(false);
          setIsGameFound(true);
        } else {
          setIsGameFound(false);
        }
      })
      .catch((e) => console.log(e));
  }, [dispatch, keyID]);

  const onNewGame = useCallback(() => {
    setShouldShowLogin(true);
    setIsDealerLogin(true);
  }, []);

  const onPopUpClose = useCallback(() => {
    setShouldShowLogin(false);
  }, []);

  return (
    <article>
      {shouldShowLogin && dealerLogin && (
        <LoginPopap onClose={onPopUpClose} onSubmit={onLoginDealer} isDealer />
      )}
      {shouldShowLogin && !dealerLogin && (
        <LoginPopap onClose={onPopUpClose} onSubmit={onLoginPlayer} />
      )}
      <section>
        <button onClick={onNewGame}>Create new game</button>
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

          <button type="button" onClick={onPlay}>
            Play
          </button>
        </form>
        {!isGameFound && <p>Game not found...</p>}
      </section>
    </article>
  );
};
export default MainPage;
