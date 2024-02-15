import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App';

// uncomment so that webpack can bundle styles
// import './scss/application.scss';
console.log('outside App');
// render(
//   <App />,
//   document.getElementById('root')
// );

const root = createRoot(document.getElementById('root'));
root.render(<App />);