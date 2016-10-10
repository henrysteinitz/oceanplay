export const LOAD_PROFILE = 'LOAD_PROFILE';
export const FOLLOW_USER = 'FOLLOW_USER';
export const UNFOLLOW_USER = 'UNFOLLOW_USER';
export const CHECK_FOLLOW = 'CHECK_FOLLOW';
export const RECEIVE_FOLLOW = 'RECEIVE_FOLLOW';
export const CLEAR_FOLLOW = 'CLEAR_FOLLOW';

export const loadProfile = (id) => ({
  type: LOAD_PROFILE,
  id
});

export const followUser = (id, callback) => ({
  type: FOLLOW_USER,
  id,
  callback
});

export const unfollowUser = (id, callback) => ({
  type: UNFOLLOW_USER,
  id,
  callback
});

export const checkFollow = (id, callback) => ({
  type: CHECK_FOLLOW,
  id,
  callback
});

export const receiveFollow = (callback) => ({
  type: RECEIVE_FOLLOW,
  callback
})

export const clearFollow = (callback) => ({
  type: CLEAR_FOLLOW,
  callback
})
