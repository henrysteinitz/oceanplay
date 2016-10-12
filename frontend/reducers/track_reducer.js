import { RECEIVE_TRACK, CLEAR_TRACK, RECEIVE_COMMENT_FOR_TRACK } from '../actions/track_actions';
import merge from 'lodash/merge';

const defaultState = {comments: []};

const TrackReducer = (state = {}, action) => {
  switch (action.type) {

    case RECEIVE_TRACK:
      return action.track

    case CLEAR_TRACK:
      return {};

    case RECEIVE_COMMENT_FOR_TRACK:
      return merge({}, state, {comments: [action.comment , ...state.comments]})

    default:
      return state;
  }
}

export default TrackReducer;
