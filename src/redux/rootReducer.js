import { combineReducers } from 'redux';
import systemReducer from './system.reducer.js';
// import memberReducer from './member.reducer.js';
// import movieReducer from './movie.reducer.js';
 import userReducer from './user.reducer.js';

const rootReducer = combineReducers({
    // movieModule: movieReducer,
    // memberModule: memberReducer,
     userModule: userReducer,
    systemModule: systemReducer,
});

export default rootReducer;

