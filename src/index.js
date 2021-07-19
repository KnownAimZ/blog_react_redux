import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.jsx';
import '@fontsource/roboto';
import store from './store.js';
import {Provider} from 'react-redux';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
