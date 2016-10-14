import { RECEIVE_USER,
  CLEAR_USER,
  RECEIVE_FOLLOW,
  CLEAR_FOLLOW } from '../actions/profile_actions';
import merge from 'lodash/merge';

const ProfileReducer = (state = {following: false}, action) => {
  switch (action.type){

    case RECEIVE_USER:
      return merge({}, state, {user: action.user})

    case CLEAR_USER:
      return merge({}, state, {user: {}});

    case RECEIVE_FOLLOW:
      return merge({}, state, {following: true});

    case CLEAR_FOLLOW:
      return merge({}, state, {following: false});

    default:
      return state;
  }
}

export default ProfileReducer;
