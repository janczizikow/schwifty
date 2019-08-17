import React, {useEffect} from 'react';
import {SafeAreaView, StatusBar, Platform} from 'react-native';
import {CharacterCard} from './src/components';

const App = () => {
  useEffect(() => {
    StatusBar.setBarStyle('dark-content');
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('white');
    }
  }, []);

  return (
    <SafeAreaView>
      <CharacterCard
        name="Rick Sanchez"
        status="alive"
        image="https://rickandmortyapi.com/api/character/avatar/1.jpeg"
      />
    </SafeAreaView>
  );
};

export default App;
