import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { IStore, IStory } from "../../types";
import StoryPopup from "../story-popup/story-popup";
import { updateSettings } from "../../store/thunk";

import "./style.scss";

export default function GameStories(): JSX.Element {
  const dispatch = useDispatch();
  const { game, user } = useSelector((state: IStore) => state);
  const { settings } = game;
  const isDealer = user.role === "dealer";

  const [shouldShowPopupForAdd, setShouldShowPopupForAdd] = useState(false);
  const addStoryHandler = () => {
    setShouldShowPopupForAdd(true);
  };

  const onPopupSubmit = (newStory: IStory) => {
    setShouldShowPopupForAdd(false);
    dispatch(
      updateSettings({
        ...settings,
        stories: [...settings.stories, { ...newStory, id: uuidv4() }],
      })
    );
  };

  function handleRoomIndex(index: number) {
    console.log(settings.stories[index]);
  }

  return (
    <section className="game__stories">
      <div className="game__stories-switcher">
        <h3> 0 / {settings.stories.length}</h3>
      </div>
      <div className="game__stories-wrapper">
        <table>
          <thead>
            <tr>
              <td> # </td>
              <td> name </td>
              <td> score </td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {game.settings.stories.map((story: IStory, index: number) => (
              <tr key={story.name + index}>
                <td>
                  <button
                    className="button-for-transition"
                    onClick={() => handleRoomIndex(index)}
                  >
                    {index + 1}
                  </button>
                </td>
                <td>{story.name}</td>
                <td>{10}</td>
                <td
                  title={
                    story.description
                      ? story.description
                      : "without description..."
                  }
                  style={{ cursor: "pointer" }}
                >
                  More
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isDealer && (
        <div className="button-control">
          <button type="button" onClick={addStoryHandler}>
            Add story
          </button>
        </div>
      )}

      {shouldShowPopupForAdd && (
        <StoryPopup
          setShouldShowPopup={setShouldShowPopupForAdd}
          onPopupSubmit={onPopupSubmit}
        />
      )}
    </section>
  );
}
