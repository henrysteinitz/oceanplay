import { RECEIVE_STREAM, CLEAR_STREAM} from '../actions/stream_actions';
import { RECEIVE_TRACK_FOR_STREAM } from '../actions/track_actions';
import merge from 'lodash/merge';

const StreamReducer = (state = {}, action) => {
  let newState;

  switch (action.type){

    case RECEIVE_STREAM:
      newState = merge({}, state)
      newState.tracks = action.tracks;
      newState.kind = action.kind;
      return newState;

    case CLEAR_STREAM:
      return {tracks: []};

    case RECEIVE_TRACK_FOR_STREAM:
      return merge({}, state, {tracks: [action.track, ...state.tracks]})

    default:
      return state;
  }
}

export default StreamReducer;
