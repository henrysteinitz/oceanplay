export const SIGNUP = 'SIGNUP';
export const SIGNIN = 'SIGNIN';
export const SIGNOUT = 'SIGNOUT';
export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';
export const ERASE_CURRENT_USER = 'ERASE_CURRENT_USER';
export const CHECK_SESSION = 'CHECK_SESSION';

export const signup = (user, callback) => ({
  type: SIGNUP,
  callback,
  user
});

export const signin = (user, callback) => ({
  type: SIGNIN,
  callback,
  user
});
export const signout = (callback) => ({
  type: SIGNOUT,
  callback
});

export const receiveCurrentUser = (user, callback) => ({
  type: RECEIVE_CURRENT_USER,
  callback,
  user
});

export const eraseCurrentUser = (callback) => ({
  type: ERASE_CURRENT_USER,
  callback
});

export const receiveErrors = (errors) => ({
  type: RECEIVE_ERRORS,
  errors
});

export const checkSession = () => ({
  type: CHECK_SESSION
})
