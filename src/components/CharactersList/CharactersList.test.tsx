import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import {MockedProvider} from '@apollo/react-testing';
import CharactersList, {MORE_CHARACTERS_QUERY} from './CharactersList';

const mocks = [
  {
    request: {
      query: MORE_CHARACTERS_QUERY,
      variables: {
        page: 1,
      },
    },
    result: {
      data: {
        characters: {
          info: {
            pages: 25,
            next: 2,
          },
          results: [
            {
              id: 1,
              name: 'Rick Sanchez',
              status: 'Alive',
              image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
            },
          ],
        },
      },
    },
  },
];
mocks; // TODO: use the mock for more test

describe('<CharactersList />', () => {
  it('renders without crashing', () => {
    renderer.act(() => {
      <MockedProvider mocks={[]} addTypename={false}>
        <CharactersList />
      </MockedProvider>;
    });
  });
});
