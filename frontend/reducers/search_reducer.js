import { RECEIVE_RESULTS, CLEAR_RESULTS } from '../actions/search_actions';
import merge from 'lodash/merge';

const SessionReducer = (state = {results: {}}, action) => {
  switch (action.type) {
    case RECEIVE_RESULTS:
      return {results: action.results};

    case CLEAR_RESULTS:
      return {results: {} };

    default:
      return state;
  }
}

export default SessionReducer;
