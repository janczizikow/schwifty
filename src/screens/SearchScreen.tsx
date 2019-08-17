import React, {useState} from 'react';
import {
  View,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  ListRenderItemInfo,
} from 'react-native';
import {NavigationScreenProps} from 'react-navigation';
import gql from 'graphql-tag';
import {useApolloClient} from 'react-apollo';
import debounce from 'lodash/debounce';

import {Header, CharacterCard} from '../components';
import {Character, Characters} from '../graphql';

export const SEARCH_CHARACTERS_QUERY = gql`
  query searchCharactersQuery($name: String!) {
    characters(filter: {name: $name}) {
      results {
        id
        name
        status
        image
      }
    }
  }
`;

const SearchScreen: React.FC<NavigationScreenProps> = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<Character[]>([]);
  const client = useApolloClient();
  const goBack = () => {
    navigation.pop();
  };

  const handleSearch = debounce(async (text: string) => {
    if (text) {
      setLoading(true);

      try {
        const {data} = await client.query<{characters: Characters}>({
          query: SEARCH_CHARACTERS_QUERY,
          variables: {name: text},
        });

        if (data.characters.results) {
          setSearchResults(data.characters.results);
        }
      } catch (err) {
        // TODO: error handling
      }

      setLoading(false);
    } else {
      setSearchResults([]);
    }
  }, 350);

  const keyExtractor = (character: Character) => character.id!;

  const renderFlatListItem = ({item}: ListRenderItemInfo<Character>) => (
    <CharacterCard
      image={item.image!}
      name={item.name!}
      status={item.status!}
    />
  );

  const getItemLayout = (_: Character[] | null, index: number) => ({
    length: CharacterCard.HEIGHT,
    offset: CharacterCard.HEIGHT * index,
    index,
  });

  return (
    <View style={styles.flex}>
      <Header onBackButtonPress={goBack} onChangeSearchText={handleSearch} />
      <View style={styles.flex}>
        {loading ? (
          <View style={styles.center}>
            <ActivityIndicator />
          </View>
        ) : (
          <FlatList
            keyExtractor={keyExtractor}
            renderItem={renderFlatListItem}
            data={searchResults}
            getItemLayout={getItemLayout}
            // TODO: ListEmptyComponent
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SearchScreen;
