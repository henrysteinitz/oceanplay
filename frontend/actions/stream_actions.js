
export const LOAD_MAIN_STREAM = 'LOAD_MAIN_STREAM';
export const RECEIVE_STREAM = 'RECEIVE_STREAM';
export const CLEAR_STREAM = 'CLEAR_STREAM';
export const LOAD_PROFILE_STREAM = 'LOAD_PROFILE_STREAM';

export const receiveStream = (tracks, kind) => ({
  type: RECEIVE_STREAM,
  tracks,
  kind
});

export const clearStream = () => ({
  type: CLEAR_STREAM
})

// caught by middleware / builds user's main stream via ajax
export const loadMainStream = (tab) => ({
  type: LOAD_MAIN_STREAM,
  tab
})

export const loadProfileStream = (tab, id) => ({
  type: LOAD_PROFILE_STREAM,
  tab,
  id
})
