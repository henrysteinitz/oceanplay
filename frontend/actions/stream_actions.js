
export const LOAD_MAIN_STREAM = 'LOAD_MAIN_STREAM';
export const RECEIVE_STREAM = 'RECEIVE_STREAM';
export const CLEAR_STREAM = 'CLEAR_STREAM'

export const receiveStream = (tracks) => ({
  type: RECEIVE_STREAM,
  tracks
});

export const clearStream = () => ({
  type: CLEAR_STREAM
})

// caught by middleware / builds user's main stream via ajax
export const loadMainStream = (tab) => ({
  type: LOAD_MAIN_STREAM,
  tab
})
