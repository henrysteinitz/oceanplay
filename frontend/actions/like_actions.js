export const LIKE = 'LIKE';
export const UNLIKE = 'UNLIKE';
export const RECEIVE_LIKES = 'RECIEVE_LIKES';
export const RECEIVE_SINGLE_LIKE = 'RECEIVE_SINGLE_LIKE';
export const LOAD_LIKES = 'LOAD_LIKES';


export const like = (track_id) => ({
  type: LIKE,
  track_id
});

export const unlike = (track_id) => ({
  type: UNLIKE,
  track_id
});

export const receiveLikes = (likes) => ({
  type: RECEIVE_LIKES,
  likes
});

export const receiveSingleLike = (like) => ({
  type: RECEIVE_SINGLE_LIKE,
  like
})

export const loadLikes = () => ({
  type: LOAD_LIKES
});
