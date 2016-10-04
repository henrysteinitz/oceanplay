export const SIGNUP = 'SIGNUP';
export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';

export const signup = (user, success) => ({
  type: SIGNUP,
  success,
  user
});

export const receiveCurrentUser = (user, success) => ({
  type: RECEIVE_CURRENT_USER,
  success,
  user
});
