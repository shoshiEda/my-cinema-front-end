export const SET_MOVIES = 'SET_MOVIES'
export const ADD_MOVIE = 'ADD_MOVIE'
export const EDIT_MOVIE = 'EDIT_MOVIE'
export const REMOVE_MOVIE = 'REMOVE_MOVIE'
export const GET_MOVIE = 'GET_MOVIE'
export const GET_ALL_MOVIES = 'GET_ALL_MOVIES'




const initialState = {
  movies:[],
  chosenMovie:null,
  allMovies:[]
}

export default function userReducer (state = initialState, action = {}) {
  switch (action.type) {
    case SET_MOVIES:
            return { ...state, movies:[...action.payload] } 

    case GET_ALL_MOVIES:
              return { ...state, allMovies:[...action.payload] } 
            
    case GET_MOVIE:
        {
        const movie = state.movies.find(movie =>movie._id === action.payload)
        return { ...state, chosenMovie:movie ? movie : state.chosenMovie }        
        }   
         
    case ADD_MOVIE:
        return { ...state, movies:[...state.movies, action.payload]  }

    case EDIT_MOVIE:
      {
            const movies = state.movies.map(movie =>
                movie._id === action.payload._id ? action.payload : movie)
            return { ...state, movies }
      }

    case REMOVE_MOVIE:
      {
        const newMovies = state.movies.filter(movie =>
            movie._id !== action.payload )

        return { ...state, movies:newMovies }
  }
    
    
    default: return state
  }
}


