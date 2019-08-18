import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import {MockedProvider} from '@apollo/react-testing';
import SearchScreen, {SEARCH_CHARACTERS_QUERY} from './SearchScreen';

const mocks = [
  {
    request: {
      query: SEARCH_CHARACTERS_QUERY,
      variables: {
        name: 'rick',
      },
    },
    result: {
      data: {
        results: {
          id: 1,
          name: 'Rick Sanchez',
          status: 'Alive',
          image: '',
        },
      },
    },
  },
];

describe('<SearchScreen />', () => {
  it('renders without crashing', () => {
    renderer.create(
      <MockedProvider mocks={mocks} addTypename={false}>
        <>
          {/*
            // @ts-ignore */}
          <SearchScreen navigation={{navigate: jest.fn()}} />
        </>
      </MockedProvider>,
    );
  });

  it('renders Activity Indicator after input', () => {});
});
