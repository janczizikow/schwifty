import ApolloClient from 'apollo-boost';
import {Hermes} from 'apollo-cache-hermes';

import {GRAPHQL_URI} from './constants';

const client = new ApolloClient({
  cache: new Hermes(),
  uri: GRAPHQL_URI,
});

export default client;
