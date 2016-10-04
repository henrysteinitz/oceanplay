import { SIGNUP, RECEIVE_CURRENT_USER, receiveCurrentUser } from '../actions/session_actions';
import { signup } from '../util/session_api_util';


const SessionMiddleware = ({getState, dispatch}) => next => action => {
  let success;
  switch (action.type) {
    case SIGNUP:
      success = (res) => {
        dispatch(receiveCurrentUser(res, action.success));
      }
      signup(action.user, success);
      return;

    case RECEIVE_CURRENT_USER:
      action.success();
      return next(action);

    default:
      return next(action);
  }
}

export default SessionMiddleware;
