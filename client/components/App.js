import React, { Component } from 'react';
import Middle from './Middle';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  components: {
    Icon: {
      defaultProps: {
      }
    }
  }
});

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <Middle></Middle>
    </ChakraProvider>
  );
};

export default App;