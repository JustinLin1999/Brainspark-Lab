import React from 'react';
import { createRoot } from 'react-dom/client';
import Middle from './components/Middle';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { store } from './store';
import { Provider } from 'react-redux';

const root = createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <ChakraProvider>
      <Middle />
    </ChakraProvider>
  </Provider>
);