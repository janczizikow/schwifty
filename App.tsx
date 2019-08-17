import React, {useState, useEffect} from 'react';
import {View, StatusBar, Platform, StyleSheet} from 'react-native';
import {ApolloProvider} from 'react-apollo';
import {Header, CharactersList} from './src/components';
import client from './src/utils/apollo';

const App = () => {
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  useEffect(() => {
    StatusBar.setBarStyle('dark-content');
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('white');
    }
  }, []);

  const openSearchModal = () => {
    setIsSearchModalOpen(true);
  };

  return (
    <ApolloProvider client={client}>
      <View style={styles.flex}>
        <Header title="Schwifty" onPressSearch={openSearchModal} />
        <CharactersList />
      </View>
    </ApolloProvider>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
});

export default App;
