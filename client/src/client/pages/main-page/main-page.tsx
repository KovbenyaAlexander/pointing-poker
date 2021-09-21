import React, { ReactElement, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { KeyGameIdActions } from "../../store/actions";
import { LoginPopap } from "../../components/login-popap/login-popap";
import "./style.scss";
import NewUserFrom from "../../components/new-user-form/new-user-form";

const url = "http://localhost:5000/api";

const MainPage = (props: any): ReactElement => {
  //  const [stateValid, setStateValid] = useState<any>({
  //   statePopap: false,
  //   errorValidIdKey: "",
  // });
  const dispatch = useDispatch();
  const { gameId }: any = props.match.params;
  // test state 
  const [nameDieler, setNameDieler] = useState('')
  // **
  const [gameIdUser, setGameIdUser] = useState(gameId || "");


  const [shouldShowLogin, setShouldShowLogin] = useState(false);
  const [isGameFound, setIsGameFound] = useState(true);


  // const [stateValid, setStateValid] = useState<any>({
  //   statePopap: false,
  //   errorValidIdKey: "",
  // });

  // const { statePopap, errorValidIdKey } = stateValid;


  async function onJoinGame() {
    const userName = nameDieler;

    const res = await fetch(`${url}/newGame`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userName }),
    });

    const req = await res.json();
    setGameIdUser(req);
  }

  async function getIdKey() {
    const res = await fetch(`${url}/checkedIdKey`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ gameIdUser }),
    });


      const { id } = await res.json()
      const idKeyUser = id
      if  (!id) {
        // setStateValid({
  
        //   statePopap: false,
        //   errorValidIdKey: "Game not found...",
          
        // });

        setIsGameFound(false)
        
      } else{
        // setStateValid({ statePopap: true, errorValidIdKey: "" });
        setShouldShowLogin(true)
        // dispatch(KeyGameIdActions(idKeyUser))
      }
      

  }
  return (
    <article>
      {shouldShowLogin && <LoginPopap statePopap={setShouldShowLogin} />}
      <section>
          

          {/* test created dealer */}
          {/* <h2 className="new-game__title">Create New Game!</h2>
          <p>Name dealer:</p>
          <input type="text" onChange={(e) => setNameDieler(e.target.value)}/>
          <button type="button" onClick={() => onJoinGame()}>Create New Game</button> */}
          <NewUserFrom/>
          {/* ***** */}


      </section>
      <h2 className="main-page__separator">OR</h2>
      <section>
        <p>Connect to lobby by URL: </p>
        <form>

          <input
            type="text"
            value={gameIdUser}
            onChange={(e) => setGameIdUser(e.target.value)}
          />

          <button type="button" onClick={() => getIdKey()}>
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