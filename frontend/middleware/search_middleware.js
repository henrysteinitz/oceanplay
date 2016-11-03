import { SEARCH, receiveResults } from '../actions/search_actions';
import { search } from '../util/search_api_util';

const SearchMiddleware = ({getState, dispatch}) => next => action => {
  switch (action.type) {
    case SEARCH:
      return search(action.string, (res) => {
        console.log(res.artists.length);
        dispatch(receiveResults(res))
        //action.callback()

      });
    default:
      return next(action);
  }
}

export default SearchMiddleware;
