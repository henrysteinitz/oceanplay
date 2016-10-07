import { UPLOAD_TRACK } from '../actions/track_actions';
import { uploadTrack } from '../util/track_api_util'

const TrackMiddleware = ({getState, dispatch}) => next => action => {
  switch (action.type) {

    case UPLOAD_TRACK:
      uploadTrack(action.trackData, action.callback);

    default:
      next(action);

  }
}

export default TrackMiddleware;
