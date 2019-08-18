import 'react-native';
import React from 'react';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import {MockedProvider} from '@apollo/react-testing';

import App from './App';

// @ts-ignore
const mocks = [];

describe('<App />', () => {
  it('renders without crashing', () => {
    renderer.create(
      // @ts-ignore
      <MockedProvider mocks={mocks} addTypename={false}>
        <App />
      </MockedProvider>,
    );
  });
});
