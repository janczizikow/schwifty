import {Character} from './../../graphql.d';

export enum SearchActionTypes {
  SEARCH_INIT = 'search/SEARCH_INIT',
  SEARCH_SUCCESS = 'search/SEARCH_SUCCESS',
  SEARCH_FAILED = 'search/SEARCH_FAILED',
}

interface SearchInitAction {
  type: SearchActionTypes.SEARCH_INIT;
  query: string;
}

interface SearchSuccessAction {
  type: SearchActionTypes.SEARCH_SUCCESS;
  results: Character[] | null;
}

interface SearchFailedAction {
  type: SearchActionTypes.SEARCH_FAILED;
  error: Error;
}

export type SearchActions =
  | SearchInitAction
  | SearchSuccessAction
  | SearchFailedAction;

export const searchInit = (query: string): SearchInitAction => ({
  type: SearchActionTypes.SEARCH_INIT,
  query,
});

export const searchSuccess = (
  results: Character[] | null,
): SearchSuccessAction => ({
  type: SearchActionTypes.SEARCH_SUCCESS,
  results: results,
});

export const searchFailed = (error: Error): SearchFailedAction => ({
  type: SearchActionTypes.SEARCH_FAILED,
  error,
});
