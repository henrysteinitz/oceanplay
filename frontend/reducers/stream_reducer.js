import { RECEIVE_STREAM, CLEAR_STREAM } from '../actions/stream_actions';
import merge from 'lodash/merge';

const StreamReducer = (state = {}, action) => {
  let newState;

  switch (action.type){

    case RECEIVE_STREAM:
      newState = merge({}, state, {tracks: action.tracks})
      return newState;

    case CLEAR_STREAM:
      return {tracks: []};

    default:
      return state;

  }
}

export default StreamReducer;
