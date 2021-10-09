import {
  IUserInfo,
  IGame,
  Actions,
  IExclude,
  SetGameAction,
  StartExcludeAction,
  StopExcludeAction,
  ISettings,
  UpdateMembersAction,
  SetSocketAction,
  IChatMessage,
  UpdateChatMessagesAction,
  SetIsLoadingAction,
  SetChoosenCardAction,
  AddNewUserImageAction,
} from '../types';
import { ISocketApi, IUserImage } from '../types/store-types';
import { AllActions } from './reducers';

export function UpdateUser(payload: IUserInfo): AllActions {
  return {
    type: Actions.UPDATE_USERINFO,
    payload,
  };
}

export function UpdateSettings(payload: ISettings): AllActions {
  return {
    type: Actions.UPDATE_SETTINGS,
    payload,
  };
}

export function SetGame(payload: IGame): SetGameAction {
  return {
    type: Actions.SET_GAME,
    payload,
  };
}

export function StartExclude(payload: IExclude): StartExcludeAction {
  return {
    type: Actions.START_EXCLUDE,
    payload,
  };
}

export function StopExlude(): StopExcludeAction {
  return {
    type: Actions.STOP_EXCLUDE,
  };
}

export function setInitialStore(): AllActions {
  return {
    type: Actions.SET_DEFAULT_SETTINGS,
  };
}

export function UpdateMembers(payload: IUserInfo[]): UpdateMembersAction {
  return {
    type: Actions.UPDATE_MEMBERS,
    payload,
  };
}

export function SetSocketApi(payload: ISocketApi): SetSocketAction {
  return {
    type: Actions.SET_SOCKETAPI,
    payload,
  };
}

export function UpdateChatMessages(payload: IChatMessage): UpdateChatMessagesAction {
  return {
    type: Actions.UPDATE_CHAT_MESSAGES,
    payload,
  };
}

export function SetIsLoading(payload: boolean): SetIsLoadingAction {
  return {
    type: Actions.SET_IS_LOADING,
    payload,
  };
}

export function SetChoosenCard(payload: number | string): SetChoosenCardAction {
  return {
    type: Actions.SET_CHOOSEN_CARD,
    payload,
  };
}

export function AddUserImage(id: string, image: string): AddNewUserImageAction {
  return {
    type: Actions.ADD_NEW_USER_IMAGE,
    payload: [{ id, image }],
  };
}

export function AddUsersImages(arr : IUserImage[]): AddNewUserImageAction {
  return {
    type: Actions.ADD_NEW_USER_IMAGE,
    payload: arr,
  };
}
