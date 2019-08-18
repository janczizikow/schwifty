import React, {useReducer} from 'react';
import {
  View,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  ListRenderItemInfo,
  Text,
} from 'react-native';
import {NavigationScreenProps} from 'react-navigation';
import gql from 'graphql-tag';
import {useApolloClient} from 'react-apollo';
import debounce from 'lodash/debounce';

import {Header, CharacterCard} from '../../components';
import {searchInit, searchSuccess, searchFailed} from './searchActions';
import searchReducer, {hasSearchResults} from './searchReducer';
import {Character, Characters} from '../../graphql';

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
  const [state, dispatch] = useReducer(searchReducer, {
    loading: false,
    dirty: false,
    results: [],
    error: null,
  });
  const client = useApolloClient();
  const goBack = () => {
    navigation.pop();
  };

  const handleSearch = debounce(async (text: string) => {
    dispatch(searchInit(text));
    if (text) {
      try {
        const {data} = await client.query<{characters: Characters}>({
          query: SEARCH_CHARACTERS_QUERY,
          variables: {name: text},
        });
        dispatch(searchSuccess(data.characters.results as Character[] | null));
      } catch (err) {
        dispatch(searchFailed(err));
      }
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

  const renderEmptyState = () => {
    return state.dirty ? (
      <Text style={styles.centerText}>No results!</Text>
    ) : null;
  };

  const getItemLayout = (_: Character[] | null, index: number) => ({
    length: CharacterCard.HEIGHT,
    offset: CharacterCard.HEIGHT * index,
    index,
  });

  return (
    <View style={styles.flex}>
      <Header onBackButtonPress={goBack} onChangeSearchText={handleSearch} />
      <View style={styles.flex}>
        {state.loading ? (
          <View style={styles.center}>
            <ActivityIndicator />
          </View>
        ) : state.error ? (
          <View style={styles.center}>
            <Text>{state.error.message}</Text>
          </View>
        ) : (
          <FlatList
            contentContainerStyle={
              hasSearchResults(state) ? undefined : styles.list
            }
            keyExtractor={keyExtractor}
            renderItem={renderFlatListItem}
            data={state.results}
            getItemLayout={getItemLayout}
            ListEmptyComponent={renderEmptyState}
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
  list: {
    flex: 1,
    justifyContent: 'center',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerText: {
    textAlign: 'center',
  },
});

export default SearchScreen;
