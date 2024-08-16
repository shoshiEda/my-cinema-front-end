export const SET_USERS = 'SET_USERS'
export const ADD_NEW_USER = 'ADD_NEW_USER'
export const EDIT_USER = 'EDIT_USER'
export const REMOVE_USER = 'REMOVE_USER'


const initialState = {
  users:[]
  
}

export default function userReducer (state = initialState, action = {}) {
  switch (action.type) {
    case SET_USERS:
            return { ...state, users:[...action.payload] }           
         
    case ADD_NEW_USER:
        return { ...state, users:[...state.users, action.payload]  }

    case EDIT_USER:
      {
            const users = state.users.map(user =>
                user._id === action.payload._id ? action.payload : user)
            return { ...state, users }
      }

    case REMOVE_USER:
      {
        const newUsers = state.users.filter(user =>
            user._id !== action.payload )
        return { ...state, users:newUsers }
  }
    
    
    default: return state
  }
}


