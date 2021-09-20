import { combineReducers } from 'redux';
import { Actions, SettingsActions, UserActions, UserUpdateAction } from './types/actions-types';
import { IIdKeyUser, ISettings, IUserInfo } from './types/store-types';


const mockSettings: ISettings = { time: 30 };


function settingsDataReducer(state: ISettings = mockSettings, action: SettingsActions) {
  switch (action.type) {
    case Actions.UPDATE_SETTINGS:
      return { ...state, ...action.payload};
    default:
      return state;
  }
}


const mockIdKey = {
  keyID: ''
}

function keyIdReducer(state:IIdKeyUser = mockIdKey, action:any) {
  switch (action.type) {
    case Actions.UPDATE_KEY_GAME:
      return {...state, keyID: action.payload}  
    default:
      return state
  }
}

const mockUser = {
  firstName: '',
  lastName: '',
  jobPosition: '',
  photoUser: '',
  role: "player"

}


 function userDataReducer(state:IUserInfo = mockUser, action:UserUpdateAction) {
  switch (action.type) {
    case Actions.UPDATE_USERINFO:
      return { ...state,  ...action.payload}  
    default:
      return state
  }
}



export const reducer = combineReducers({
  user: userDataReducer,
  settings: settingsDataReducer,
  idKey: keyIdReducer,
});
