import { combineReducers } from 'redux';
import SessionReducer from './session_reducer';
import StreamReducer from './stream_reducer';
import NowPlayingReducer from './now_playing_reducer';

export default combineReducers({
  session: SessionReducer,
  stream: StreamReducer,
  nowPlaying: NowPlayingReducer
});
