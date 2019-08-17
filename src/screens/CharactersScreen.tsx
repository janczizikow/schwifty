import React from 'react';
import {View, StyleSheet} from 'react-native';
import {NavigationScreenProps} from 'react-navigation';
import {Header, CharactersList} from '../components';

const CharactersScreen: React.FC<NavigationScreenProps> = ({navigation}) => {
  const handleSearchPress = () => {
    navigation.navigate('Search');
  };

  return (
    <View style={styles.flex}>
      <Header title="Schwifty" onPressSearch={handleSearchPress} />
      <CharactersList />
    </View>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
});

export default CharactersScreen;
