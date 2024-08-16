import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './assets/style/main.css'

import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';


import rootReducer from './redux/rootReducer.js';

const store = configureStore({
  reducer: rootReducer,
});

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </Provider>
)

export default store;

