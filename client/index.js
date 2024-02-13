import React from 'react';
import { render } from 'react-dom';
import App from './components/App';

// uncomment so that webpack can bundle styles
// import './scss/application.scss';
console.log('in?');
render(
  <App />,
  document.getElementById('root')
);