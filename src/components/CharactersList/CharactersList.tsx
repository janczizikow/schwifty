import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  ActivityIndicator,
  Text,
} from 'react-native';
import {RecyclerListView, DataProvider} from 'recyclerlistview';
import gql from 'graphql-tag';
import {useQuery} from 'react-apollo';
import LayoutProvider, {LAYOUT_TYPE} from './LayoutProvider';
import CharacterCard from '../CharacterCard';

export const MORE_CHARACTERS_QUERY = gql`
  query charactersQuery($page: Int!) {
    characters(page: $page) {
      info {
        pages
        next
      }
      results {
        id
        name
        species
        status
        image
      }
    }
  }
`;

const CharactersList = () => {
  const SCREEN_HEIGHT = Dimensions.get('window').height;
  const [list, setList] = useState(new DataProvider((r1, r2) => r1 !== r2));
  const [fetchedAllPages, setFetchedAllPages] = useState(false);
  const {
    loading,
    error,
    data: {characters},
    fetchMore,
  } = useQuery(MORE_CHARACTERS_QUERY, {
    variables: {page: 1},
  });

  useEffect(() => {
    if (characters) {
      setList(prevList =>
        prevList.cloneWithRows(
          characters.results.map(character => ({
            type: LAYOUT_TYPE,
            item: character,
          })),
        ),
      );
    }
  }, [characters]);

  const rowRenderer = (type: string | number, data: any) => (
    <CharacterCard
      name={data.item.name}
      image={data.item.image}
      status={data.item.status}
    />
  );

  const renderFooter = () => <ActivityIndicator />;

  const fetchNextPage = () => {
    if (!fetchedAllPages) {
      fetchMore({
        variables: {page: characters.info.next},
        updateQuery: (previousResults, {fetchMoreResult}) => {
          const pageInfo = fetchMoreResult.characters.info;
          const newCharacters = fetchMoreResult.characters.results;

          if (pageInfo.next === null) {
            setFetchedAllPages(true);
          }

          return Object.assign({}, previousResults, {
            characters: {
              info: pageInfo,
              results: [
                ...previousResults.characters.results,
                ...newCharacters,
              ],
              __typename: previousResults.__typename,
            },
          });
        },
      });
    }
  };

  if (loading) {
    return (
      <View style={[styles.flex, styles.center]}>
        <ActivityIndicator />
      </View>
    );
  }

  if (error) {
    return <Text>Error</Text>;
  }

  return (
    <View style={styles.flex}>
      <RecyclerListView
        style={styles.flex}
        rowRenderer={rowRenderer}
        dataProvider={list}
        layoutProvider={LayoutProvider}
        onEndReachedThreshold={Math.floor(SCREEN_HEIGHT * 0.5)}
        onEndReached={fetchNextPage}
        renderFooter={renderFooter}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CharactersList;
