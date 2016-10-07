import { PLAY_TRACK, PAUSE_TRACK } from '../actions/track_actions'
import merge from 'lodash/merge';

const default_state = {
  playing: false,
  track: {}
}

export const NowPlayingReducer = (state = default_state, action) => {
  switch(action.type){

    case PLAY_TRACK:
      return merge({}, state, {playing: true, track: action.track});

    case PAUSE_TRACK:
      return merge({}, state, {playing: false});

    default:
      return state;
  }
}

export default NowPlayingReducer;
