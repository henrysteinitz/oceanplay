import { POST_RETRACK,
  DELETE_RETRACK,
  LOAD_RETRACKS,
  receiveSingleRetrack,
  receiveRetracks } from '../actions/track_actions';
import { postRetrack, deleteRetrack, fetchRetracks } from '../util/retrack_api_util';

const RetrackMiddleware = ({getState, dispatch}) => next => action => {

  switch (action.type) {
    case POST_RETRACK:
      return postRetrack(action.id, (res) => {
        if (res.status === 200){
          dispatch(receiveSingleRetrack(res))
          //action.callback();
        }
      });

    case DELETE_RETRACK:
      return deleteRetrack(action.id, (res) => {
        if (res.status === 200){
          dispatch(receiveSingleRetrack({
            retrackIndicator: {[action.id]: false}
          }));
        }
      });

    case LOAD_RETRACKS:
      return fetchRetracks((res) => {
        dispatch(receiveRetracks(res.retracks))
      });

    default:
      return next(action)
  }
}

export default RetrackMiddleware;
