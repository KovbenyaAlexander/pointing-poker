import React, {
  ReactElement, useCallback, useEffect, useState,
} from 'react';
import uuid from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { LoginPopap } from '../../components/login-popap/login-popap';
import { isGameActive } from '../../store/thunk';
import { AppDispatch } from '../../types/middleware-types';
import { UpdateUser } from '../../store/actions';
import { IStore } from '../../types/store-types';
import './style.scss';

const MainPage = (props: any): ReactElement => {
  const dispatch: AppDispatch = useDispatch();
  const { isActive, id } = useSelector((sel: IStore) => sel.game);
  const { gameId }: any = props.match.params;
  const [keyID, setKeyID] = useState(gameId || '');
  const [shouldShowLogin, setShouldShowLogin] = useState(false);
  const [isGameFound, setIsGameFound] = useState<boolean | null>(null);
  const [dealerLogin, setIsDealerLogin] = useState(true);
  const history = useHistory();

  const onLoginDealer = useCallback(
    (data) => {
      const photo = data.photoUser;
      const sid = uuid.v4();
      data.photoUser = '';
      dispatch(UpdateUser({ ...data, userID: sid }));
      history.push('settings');
    },
    [dispatch, history],
  );

  const onLoginPlayer = useCallback(
    (data) => {
      dispatch(UpdateUser({ ...data, userID: uuid.v4() }));
      history.push(isActive ? `game/${keyID}` : `lobby/${keyID}`);
    },
    [dispatch, history, isActive, keyID],
  );

  const onPlay = (e: React.FormEvent) => {
    e.preventDefault();
    if (keyID === '') {
      return;
    }
    dispatch(isGameActive(keyID))
      .then((res: any) => {
        if (res) {
          setShouldShowLogin(true);
          setIsDealerLogin(false);
          setIsGameFound(true);
        } else {
          setIsGameFound(false);
        }
      })
      .catch((err) => console.log(err));
  };

  const onNewGame = useCallback(() => {
    setShouldShowLogin(true);
    setIsDealerLogin(true);
  }, []);

  const onPopUpClose = useCallback(() => {
    setShouldShowLogin(false);
  }, []);

  useEffect(() => {
    if (gameId) {
      setKeyID(gameId);
      history.replace('/');
    }
  }, [gameId]);

  useEffect(() => {
    if (id) history.push(`/lobby/${id}`);
  }, [id]);

  return (
    <article>
      {shouldShowLogin && dealerLogin && (
        <LoginPopap onClose={onPopUpClose} onSubmit={onLoginDealer} isDealer />
      )}
      {shouldShowLogin && !dealerLogin && (
        <LoginPopap onClose={onPopUpClose} onSubmit={onLoginPlayer} />
      )}

      <div className="main-page__logo-container">
        <h1 className="main-page__logo">Pointing</h1>
        <h1 className="main-page__logo-red">Poker</h1>
      </div>

      <div className="main-page__wrapper">

        <section className="main-page__new-game">
          <p className="main-page__description">Start on your own</p>
          <button
            className="button button_green button_medium"
            type="button"
            onClick={onNewGame}
          >
            Create new game

          </button>
        </section>

        <div className="main-page__separator-wrapper">
          <h2 className="main-page__separator">O</h2>
          <h2 className="main-page__separator main-page__separator-red">R</h2>
        </div>

        <section className="main-page__connect">
          <form onSubmit={(e) => onPlay(e)}>
            <input
              className="main-page__connect-input input"
              type="text"
              value={keyID}
              onChange={(e) => setKeyID(e.target.value)}
              placeholder="Input id for the game"
            />
            <button type="submit" className="button button_red button_medium">
              Play
            </button>

            {isGameFound === false && <p>Game not found</p>}

          </form>
        </section>
      </div>

    </article>
  );
};
export default MainPage;
