export const SET_MEMBERS = 'SET_MEMBERS'
export const ADD_MEMBER = 'ADD_MEMBER'
export const EDIT_MEMBER = 'EDIT_MEMBER'
export const REMOVE_MEMBER = 'REMOVE_MEMBER'
export const GET_MEMBER = 'GET_MEMBER'



const initialState = {
  members:[],
  chosenMember : null
}

export default function userReducer (state = initialState, action = {}) {
  switch (action.type) {
    case SET_MEMBERS:
            return { ...state, members:[...action.payload] }
    case GET_MEMBER:
    {
    const member = state.members.find(member =>member._id === action.payload)
        return { ...state, chosenMember:member? member : state.chosenMember }        
    }       
    case ADD_MEMBER:
        return { ...state, members:[...state.members, action.payload]  }

    case EDIT_MEMBER:
      {
            const members = state.members.map(member =>
                member._id === action.payload._id ? action.payload : member)
            return { ...state, members }
      }

    case REMOVE_MEMBER:
      {
        const newMembers = state.members.filter(member =>
            member._id !== action.payload )

        return { ...state, members:newMembers }
  }
    
    
    default: return state
  }
}


