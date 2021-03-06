import { UPLOAD_TRACK,
  LOAD_TRACK,
  POST_COMMENT,
  POST_RETRACK,
  receiveCommentForTrack,
  receiveTrack } from '../actions/track_actions';
import { uploadTrack, fetchTrack, postComment } from '../util/track_api_util';

const TrackMiddleware = ({getState, dispatch}) => next => action => {
  switch (action.type) {

    case UPLOAD_TRACK:
      return uploadTrack(action.trackData, action.callback);

    case LOAD_TRACK:
      return fetchTrack(action.id, (res) => dispatch(receiveTrack(res.track)));

    case POST_COMMENT:
      return postComment(action.comment, (res) => {
        if (res.status === 200){
          dispatch(receiveCommentForTrack(res));
          action.callback();
        }
      });

    default:
      return next(action);

  }
}

export default TrackMiddleware;
