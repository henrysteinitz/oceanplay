export const UPLOAD_TRACK = 'UPLOAD_TRACK'

export const uploadTrack = (trackData, callback) => ({
  type: UPLOAD_TRACK,
  trackData,
  callback
});
