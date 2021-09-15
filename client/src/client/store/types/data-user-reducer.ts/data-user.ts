import { Actions, IDataUserUpdateAction } from '../actions-types';
import { IDataUser } from '../store-types';

const defaultState = {

  lastName: '',
  firstName: '',
  jobPosition: '',
  photoUser: '',

};

export const DataUserReducer = (state = defaultState, action: IDataUserUpdateAction):IDataUser => {
  switch (action.type) {
    case Actions.ADDED_DATA_USER:
      return { ...state, ...action.payload };

    default:
      return state;
  }
};
