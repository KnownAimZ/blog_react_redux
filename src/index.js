import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app/App.jsx';
import '@fontsource/roboto';
import store from './app/store.js';
import {Provider} from 'react-redux';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
