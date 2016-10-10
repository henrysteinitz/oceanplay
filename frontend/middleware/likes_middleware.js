import { LIKE, UNLIKE, LOAD_LIKES, receiveLikes, receiveSingleLike } from '../actions/like_actions';
import { fetchLikes, like, unlike } from '../util/likes_api_util';

const LikesMiddleware = ({getState, dispatch}) => next => action => {
  switch(action.type){

    case LOAD_LIKES:
      return fetchLikes((res) => {
        dispatch(receiveLikes(res.likes))
      });

    case LIKE:
      return like(action.track_id, (res) => {
        dispatch(receiveSingleLike(res.like));
      });

    case UNLIKE:
      return unlike(action.track_id, (res) => dispatch(receiveSingleLike(res.like)));

    default:
      return next(action);
  }
}

export default LikesMiddleware;
