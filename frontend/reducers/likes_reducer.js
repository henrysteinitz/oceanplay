import { RECEIVE_LIKES, RECEIVE_SINGLE_LIKE } from '../actions/like_actions'
import merge from 'lodash/merge';

const LikesReducer = (state = {}, action) => {
  switch(action.type){
    case RECEIVE_LIKES:
      return action.likes

    case RECEIVE_SINGLE_LIKE:
      const newState = merge({}, state);
      const key = Object.keys(action.like)[0];
      newState[key] = action.like[key];
      return newState;

    default:
      return state;
  }
}

export default LikesReducer;
