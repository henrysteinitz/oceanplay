import { LOAD_PROFILE,
  FOLLOW_USER,
  UNFOLLOW_USER,
  CHECK_FOLLOW,
  receiveFollow,
  clearFollow } from '../actions/profile_actions';
import { receiveStream } from '../actions/stream_actions';
import { fetchFullUser,
  followUser,
  unfollowUser,
  checkFollow } from '../util/user_api_util';


const ProfileMiddleware = ({getState, dispatch}) => next => action => {
  switch (action.type) {

    case LOAD_PROFILE:
      fetchFullUser(action.id, (res) => dispatch(receiveStream(res.tracks)));
      return;

    case FOLLOW_USER:
      followUser(action.id, (res) => {
        if (res.status === 200){
          dispatch(receiveFollow(action.callback()));
        }
      });
      return;

    case UNFOLLOW_USER:
      unfollowUser(action.id, (res) => {

        if (res.status === 200){
          dispatch(clearFollow(action.callback()));
        }
      });
      return;

    case CHECK_FOLLOW:
      checkFollow(action.id, (res) => {
        if (res.following){
          dispatch(receiveFollow(action.callback));
        } else {
          dispatch(clearFollow(action.callback));
        }
      });
    default:
      return next(action);

  }
};

export default ProfileMiddleware;
