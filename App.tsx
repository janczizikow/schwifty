import React, {useEffect} from 'react';
import {SafeAreaView, StatusBar, Platform, StyleSheet} from 'react-native';
import {ApolloProvider} from 'react-apollo';
import {CharacterList} from './src/components';
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
      <SafeAreaView style={styles.flex}>
        <CharacterList />
      </SafeAreaView>
    </ApolloProvider>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
});

export default App;
