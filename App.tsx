import React, {useEffect} from 'react';
import {StatusBar, Platform} from 'react-native';
import {ApolloProvider} from '@apollo/react-hooks';
import AppNavigator from './src/AppNavigator';
import client from './src/utils/apollo';

const App = () => {
  useEffect(() => {
    StatusBar.setBarStyle('dark-content');
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('white');
    }
  }, []);

  return (
    <ApolloProvider client={client}>
      <AppNavigator />
    </ApolloProvider>
  );
};

export default App;
