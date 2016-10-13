import {
  SIGNUP,
  SIGNIN,
  SIGNOUT,
  RECEIVE_CURRENT_USER,
  ERASE_CURRENT_USER,
  receiveCurrentUser,
  eraseCurrentUser,
  receiveErrors } from '../actions/session_actions';
import { signup, signin, signout } from '../util/session_api_util';


const SessionMiddleware = ({getState, dispatch}) => next => action => {

  const signinCallback = (res) => {
    if (res.status === 200){
      dispatch(receiveCurrentUser(res.user, action.callback));
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

    case SIGNOUT:
      signout(() => dispatch(eraseCurrentUser(action.callback)));
      return;

    case RECEIVE_CURRENT_USER:
      next(action);
      return action.callback();

    case ERASE_CURRENT_USER:
      action.callback();
      return next(action);

    default:
      return next(action);
  }
}

export default SessionMiddleware;
