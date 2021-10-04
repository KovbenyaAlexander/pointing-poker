import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./style.scss";
import { IStore, IStory } from "../../types";
import {
  NavLink,
  Redirect,
  Route,
  Switch,
  useLocation,
  useRouteMatch,
} from "react-router-dom";
import {FieldGame} from "../../components/game-page/field-game/filed-game";
import StoryPopup from "../../components/story-popup/story-popup";
import GameStories from "../../components/game-stories/game-stories";

export default function GamePage(): JSX.Element {

  return (
    <article className="game">

      <FieldGame />


      <GameStories/>

    </article>
  );
}
