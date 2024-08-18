export const SET_LOGGED_IN_USER = 'SET_LOGGED_IN_USER'

const initialState = {
  loggedInUser: JSON.parse(localStorage.getItem('loggedInUser')) || null
  
}

export default function systemReducer (state = initialState, action = {}) {
  switch (action.type) {
    case SET_LOGGED_IN_USER:
      return { ...state, loggedInUser: action.payload }

    default: return state
  }
}



export const SET_LOGGED_IN_USER = 'SET_LOGGED_IN_USER'

const initialState = {
  loggedInUser: JSON.parse(localStorage.getItem('loggedInUser')) || null
  
}

export default function systemReducer (state = initialState, action = {}) {
  switch (action.type) {
    case SET_LOGGED_IN_USER:
      return { ...state, loggedInUser: action.payload }

    default: return state
  }
}


