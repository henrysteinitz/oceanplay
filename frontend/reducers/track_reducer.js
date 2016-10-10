import { RECEIVE_TRACK, CLEAR_TRACK } from '../actions/track_actions';

const TrackReducer = (state = {}, action) => {
  switch (action.type) {

    case RECEIVE_TRACK:
      return action.track

    case CLEAR_TRACK:
      return {};

    default:
      return state;
  }
}

export default TrackReducer;
