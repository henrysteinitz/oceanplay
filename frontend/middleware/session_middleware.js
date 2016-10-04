import {
  SIGNUP,
  SIGNIN,
  RECEIVE_CURRENT_USER,
  receiveCurrentUser,
  receiveErrors } from '../actions/session_actions';
import { signup, signin } from '../util/session_api_util';


const SessionMiddleware = ({getState, dispatch}) => next => action => {

  const signinCallback = (res) => {
    if (res.status === 200){
      dispatch(receiveCurrentUser(res.user, action.success));
    } else {
      dispatch(receiveErrors(res.errors))
    }
  };

  switch (action.type) {
    case SIGNUP:
      signup(action.user, signinCallback);
      return;

    case SIGNIN:
      signin(action.user, signinCallback);
      return;

    case RECEIVE_CURRENT_USER:
      action.success();
      return next(action);

    default:
      return next(action);
  }
}

export default SessionMiddleware;
