import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import nextId from "react-id-generator";
import "./style.scss";
import { IStore } from "../../types";
import {
  NavLink,
  Redirect,
  Route,
  Switch,
  useLocation,
  useRouteMatch,
} from "react-router-dom";
import {FieldGame} from "../../components/game-page/field-game/filed-game";

export default function GamePage(): JSX.Element {
  const key = nextId("key-card");
  const select = useSelector((sel: IStore) => sel);
  const [isCardAction, setIsCardAction] = useState<any>({
    selectedCard: null,
    showSelectedCard: null,
  });
  const [addStory, setAddStory] = useState<any>([]);
  const [second, setSecond] = useState<any>(10);
  function сountdown() {
    if (second > 0) {
      setTimeout(() => setSecond(second - 1), 1000);
    } else {
      setSecond(0);
    }
  }

  // useEffect(()=>{
  //   сountdown()
  // }, [second])


  function isAddedStory() {
    const title: any = prompt();

    setAddStory([...addStory, title]);
  }
  console.log(addStory);
  // There must be at least one story


  return (
    <article className="game">
      <Switch>
      <Route exact path={`/game/${select.game.id}`}>
          <h3>Please select a topic.</h3>
      </Route>
      {addStory.map((field:string, index:number) => 
        (
          <Route key={field + index} path={`/game/${select.game.id}/${field}`} children  ={<FieldGame />}/>
        )
      )}

 
       
      </Switch>
      <section className="game-sidebar">
        <div className="table-panel">
          <table>
            <tbody>
              <tr>
                <td>number</td>
                <td>story </td>
                <td>score </td>
              </tr>
              {addStory.map((el: string, index: number) => (    
                <tr key={key + index}>
                  <td>
                    <NavLink to={`/game/${select.game.id}/${el}`}>
                      {index + 1}
                    </NavLink>
                  </td>
                  <td>{el}</td>
                  {/* <td>{isCardAction.showSelectedCard}</td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="button-bar">
          <button className="add-story" onClick={isAddedStory}>
            Add Story
          </button>
        </div>
      </section>
    </article>
  );
}
