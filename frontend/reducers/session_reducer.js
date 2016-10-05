import { RECEIVE_CURRENT_USER,
  ERASE_CURRENT_USER,
  RECEIVE_ERRORS } from '../actions/session_actions';
import merge from 'lodash/merge';

const SessionReducer = (state = {}, action) => {
  switch (action.type) {

    case RECEIVE_CURRENT_USER:
      return merge({}, state, {user: action.user});

    case ERASE_CURRENT_USER:
      const newState = merge({}, state);
      delete newState.user;
      return newState;

    case RECEIVE_ERRORS:
      return merge({}, state, {errors: action.errors});

    default:
      return state;
  }
}

export default SessionReducer;
