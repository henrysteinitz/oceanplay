export const UPLOAD_TRACK = 'UPLOAD_TRACK';
export const LOAD_TRACK = 'LOAD_TRACK';
export const RECEIVE_TRACK = 'RECEIVE_TRACK';
export const CLEAR_TRACK = 'CLEAR_TRACK';
export const PLAY_TRACK = 'PLAY_TRACK';
export const PAUSE_TRACK = 'PAUSE_TRACK';
export const SET_TIME = 'SET_TIME';
export const SET_NEW_TIME = 'SET_NEW_TIME';
export const CLEAR_NEW_TIME = 'CLEAR_NEW_TIME';
export const SET_DURATION = 'SET_DURATION';
export const RECEIVE_COMMENT_FOR_TRACK = 'RECEIVE_COMMENT_FOR_TRACK';
export const POST_COMMENT = 'POST_COMMENT';
export const SHOW_NOW_PLAYING = 'SHOW_NOW_PLAYING';
export const HIDE_NOW_PLAYING = 'HIDE_NOW_PLAYING';

export const uploadTrack = (trackData, callback) => ({
  type: UPLOAD_TRACK,
  trackData,
  callback
});

export const loadTrack = (id) => ({
  type: LOAD_TRACK,
  id
});

export const receiveTrack = (track) => ({
  type: RECEIVE_TRACK,
  track
});

export const clearTrack = () => ({
  type: CLEAR_TRACK
});

export const playTrack = (track) => ({
  type: PLAY_TRACK,
  track
});

export const pauseTrack = () => ({
  type: PAUSE_TRACK
});

export const setTime = (time) => ({
  type: SET_TIME,
  time
});

export const setNewTime = (time) => ({
  type: SET_NEW_TIME,
  time
});

export const clearNewTime = () => ({
  type: CLEAR_NEW_TIME
});

export const setDuration = (duration) => ({
  type: SET_DURATION,
  duration
});

export const receiveCommentForTrack = (comment) => ({
  type: RECEIVE_COMMENT_FOR_TRACK,
  comment
});

export const postComment = (comment) => ({
  type: POST_COMMENT,
  comment
});

export const showNowPlaying = () => ({
  type: SHOW_NOW_PLAYING
});

export const hideNowPlaying = () => ({
  type: HIDE_NOW_PLAYING
});
