const defaultState = {
dataUser: {
  lastName: '',
  firstName: '',
  jobPosition: '',
  photoUser: ''
}
}

interface IDataUser {
  firstName: string 
  lastName?: string 
  jobPosition?: string 
  photoUser?: string | ArrayBuffer | null | undefined
}



export enum ActionsDataUser {
  ADDED_DATA_USER = 'ADDED_DATA_NAME'
}

export const DataUserReducer = (state = defaultState, action: any) =>{
  switch (action.type) {
    case ActionsDataUser.ADDED_DATA_USER:
     return { ...state,  ...action.payload }

  
    default:
      return state
  }
}

export const DataUserActions = (payload: IDataUser) => ({ type: ActionsDataUser.ADDED_DATA_USER, payload });