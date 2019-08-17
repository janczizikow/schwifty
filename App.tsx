import React, {useEffect} from 'react';
import {SafeAreaView, StatusBar, Platform} from 'react-native';
import {ApolloProvider} from 'react-apollo';
import {CharacterCard} from './src/components';
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
      <SafeAreaView>
        <CharacterCard
          name="Rick Sanchez"
          status="alive"
          image="https://rickandmortyapi.com/api/character/avatar/1.jpeg"
        />
      </SafeAreaView>
    </ApolloProvider>
  );
};

export default App;
