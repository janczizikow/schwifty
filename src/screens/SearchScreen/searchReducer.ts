import {Character} from './../../graphql';
import {SearchActionTypes, SearchActions} from './searchActions';

export interface SearchReducerState {
  loading: boolean;
  dirty: boolean;
  results: Character[];
  error: Error | null;
}

const searchReducer = (state: SearchReducerState, action: SearchActions) => {
  switch (action.type) {
    case SearchActionTypes.SEARCH_INIT:
      const hasQuery = !!action.query;
      return {
        ...state,
        loading: hasQuery,
        dirty: hasQuery,
        results: [],
        error: null,
      };
    case SearchActionTypes.SEARCH_SUCCESS:
      const results = action.results;
      return {
        ...state,
        loading: false,
        results: results || [],
      };
    case SearchActionTypes.SEARCH_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default searchReducer;

export const hasSearchResults = (state: SearchReducerState) =>
  state.dirty && state.results.length;
