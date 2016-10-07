import { LOAD_PROFILE } from '../actions/profile_actions';
import { receiveStream } from '../actions/stream_actions';
import { fetchFullUser } from '../util/user_api_util';


const ProfileMiddleware = ({getState, dispatch}) => next => action => {
  switch (action.type) {

    case LOAD_PROFILE:
      fetchFullUser(action.id, (res) => dispatch(receiveStream(res.tracks)));
      return;

    default:
      return next(action);

  }
};

export default ProfileMiddleware;
