import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Dimensions, ActivityIndicator} from 'react-native';
import {RecyclerListView, DataProvider} from 'recyclerlistview';
import gql from 'graphql-tag';
import {useQuery} from '@apollo/react-hooks';
import LayoutProvider, {LAYOUT_TYPE} from './LayoutProvider';
import CharacterCard from '../CharacterCard';
import ErrorMessage from '../ErrorMessage';
import {Characters, Character} from '../../graphql';

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
        status
        image
      }
    }
  }
`;

interface CharactersQueryResults {
  __typename: 'Characters';
  characters: Characters;
}

const CharactersList = () => {
  const SCREEN_HEIGHT = Dimensions.get('window').height;
  const [list, setList] = useState(new DataProvider((r1, r2) => r1 !== r2));
  const [fetchedAllPages, setFetchedAllPages] = useState(false);
  const {loading, error, data, fetchMore, refetch} = useQuery<
    CharactersQueryResults,
    {page?: number; filter?: any}
  >(MORE_CHARACTERS_QUERY, {
    variables: {page: 1},
  });

  useEffect(() => {
    const characters = data ? data.characters : null;
    if (characters && characters.results) {
      setList(prevList =>
        prevList.cloneWithRows(
          characters.results!.map(character => ({
            type: LAYOUT_TYPE,
            item: character,
          })),
        ),
      );
    }
  }, [data]);

  const rowRenderer = (_: string | number, rowData: {item: Character}) => (
    <CharacterCard
      name={rowData.item.name!}
      image={rowData.item.image!}
      status={rowData.item.status!}
    />
  );

  const renderFooter = () => (!fetchedAllPages ? <ActivityIndicator /> : null);

  const refetchOnError = () => {
    refetch({page: 1});
  };

  const fetchNextPage = () => {
    if (
      !fetchedAllPages &&
      data &&
      data.characters.info &&
      data.characters.info.next
    ) {
      fetchMore({
        variables: {page: data.characters.info.next},
        updateQuery: (previousResults, {fetchMoreResult}) => {
          const pageInfo = fetchMoreResult!.characters.info;
          const newCharacters = fetchMoreResult!.characters.results;

          if (pageInfo && pageInfo.next === null) {
            setFetchedAllPages(true);
          }

          return previousResults.characters.results && newCharacters
            ? Object.assign({}, previousResults, {
                characters: {
                  info: pageInfo,
                  results: [
                    ...previousResults.characters.results,
                    ...newCharacters,
                  ],
                  __typename: previousResults.__typename,
                },
              })
            : previousResults;
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
    return <ErrorMessage onRetry={refetchOnError} />;
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
