import { PLAY_TRACK,
  PAUSE_TRACK,
  SET_TIME,
  SET_DURATION,
  SET_NEW_TIME,
  CLEAR_NEW_TIME,
  SHOW_NOW_PLAYING,
  HIDE_NOW_PLAYING,
  CLEAR_NOW_PLAYING } from '../actions/track_actions'
import merge from 'lodash/merge';

const defaultState = {
  playing: false,
  track: {}
}

const NowPlayingReducer = (state = defaultState, action) => {
  switch(action.type){

    case PLAY_TRACK:
      return merge({}, state, {playing: true, track: action.track});

    case PAUSE_TRACK:
      return merge({}, state, {playing: false});

    case SET_TIME:
      return merge({}, state, {time: action.time});

    case SET_NEW_TIME:
      return merge({}, state, {newTime: action.time});

    case CLEAR_NEW_TIME:
      return merge({}, state, {newTime: null});

    case SET_DURATION:
      return merge({}, state, {duration: action.duration});

    case SHOW_NOW_PLAYING:
      return merge({}, state, {showPlayer: true});

    case HIDE_NOW_PLAYING:
      return merge({}, state, {showPlayer: false});

    case CLEAR_NOW_PLAYING:
      return defaultState;

    default:
      return state;
  }
}

export default NowPlayingReducer;
