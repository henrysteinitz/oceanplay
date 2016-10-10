import { applyMiddleware } from 'redux';
import SessionMiddleware from './session_middleware';
import TrackMiddleware from './track_middleware';
import ProfileMiddleware from './profile_middleware';
import StreamMiddleware from './stream_middleware';

const RootMiddleware = applyMiddleware(
  SessionMiddleware,
  TrackMiddleware,
  ProfileMiddleware,
  StreamMiddleware
);

export default RootMiddleware;
