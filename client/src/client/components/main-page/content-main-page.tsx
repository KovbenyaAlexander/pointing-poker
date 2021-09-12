import React, { useState } from "react";
import {JoinToGameOnLink} from "./join-to-game-form/join-to-game-form";
import {BtnForPopap} from "./btn-for-popap/btn-for-popap";
import { PopapForRegistration } from "./popap-for-registration/popap-for-registration";


export const ContentHelloPage = () =>{
  const [statePopap, setStatePopap] = useState(true)
  return(
    <article>
    <section >
      <h2 className="new-game__title">Create New Game!</h2>
      <BtnForPopap statePopap = {setStatePopap}/>
    </section>
    <h2 className="hello-page__separator">OR</h2>
    <section >
      <JoinToGameOnLink />
    </section>
    {statePopap ? <PopapForRegistration statePopap = {setStatePopap}/> : ''}
  </article>
  )
}