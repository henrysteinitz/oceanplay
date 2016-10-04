export const SIGNUP = 'SIGNUP';
export const SIGNIN = 'SIGNIN';
export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';

export const signup = (user, success) => ({
  type: SIGNUP,
  success,
  user
});

export const signin = (user, success) => ({
  type: SIGNIN,
  success,
  user
});

export const receiveCurrentUser = (user, success) => ({
  type: RECEIVE_CURRENT_USER,
  success,
  user
});

export const receiveErrors = (errors) => ({
  type: RECEIVE_ERRORS,
  errors
});
