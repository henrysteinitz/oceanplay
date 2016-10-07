export const UPLOAD_TRACK = 'UPLOAD_TRACK';
export const PLAY_TRACK = 'PLAY_TRACK';
export const PAUSE_TRACK = 'PAUSE_TRACK';

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
