import { receiveStream,
  LOAD_MAIN_STREAM,
  LOAD_PROFILE_STREAM } from '../actions/stream_actions';
import { fetchStream,  } from '../util/stream_api_util';

const StreamMiddleware = ({getState, dispatch}) => next => action => {
  switch (action.type) {

    case LOAD_MAIN_STREAM:
      return fetchStream(action.tab, (res) => {
        dispatch(receiveStream(res, action.tab));
      });

    case LOAD_PROFILE_STREAM:
      return fetchStream(action.tab, (res) => {
        dispatch(receiveStream(res, action.tab))
      }, action.id)

    default:
      return next(action);
  }
}

export default StreamMiddleware;
