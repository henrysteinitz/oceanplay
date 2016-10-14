import { applyMiddleware } from 'redux';
import SessionMiddleware from './session_middleware';
import TrackMiddleware from './track_middleware';
import LikesMiddleware from './likes_middleware';
import ProfileMiddleware from './profile_middleware';
import StreamMiddleware from './stream_middleware';
import RetrackMiddleware from './retrack_middleware';

const RootMiddleware = applyMiddleware(
  SessionMiddleware,
  TrackMiddleware,
  LikesMiddleware,
  ProfileMiddleware,
  StreamMiddleware,
  RetrackMiddleware
);

export default RootMiddleware;
