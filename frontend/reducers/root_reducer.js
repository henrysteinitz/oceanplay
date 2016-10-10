import { combineReducers } from 'redux';
import SessionReducer from './session_reducer';
import StreamReducer from './stream_reducer';
import ProfileReducer from './profile_reducer';
import LikesReducer from './likes_reducer';
import NowPlayingReducer from './now_playing_reducer';
import TrackReducer from './track_reducer'

export default combineReducers({
  session: SessionReducer,
  stream: StreamReducer,
  profile: ProfileReducer,
  likes: LikesReducer,
  nowPlaying: NowPlayingReducer,
  track: TrackReducer
});
