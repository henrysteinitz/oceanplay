export const UPLOAD_TRACK = 'UPLOAD_TRACK';
export const PLAY_TRACK = 'PLAY_TRACK';
export const PAUSE_TRACK = 'PAUSE_TRACK';
export const SET_TIME = 'SET_TIME';
export const SET_NEW_TIME = 'SET_NEW_TIME';
export const CLEAR_NEW_TIME = 'CLEAR_NEW_TIME';
export const SET_DURATION = 'SET_DURATION';

export const uploadTrack = (trackData, callback) => ({
  type: UPLOAD_TRACK,
  trackData,
  callback
});

export const playTrack = (track) => ({
  type: PLAY_TRACK,
  track
});

export const pauseTrack = () => ({
  type: PAUSE_TRACK
})

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
})

export const setDuration = (duration) => ({
  type: SET_DURATION,
  duration
});
