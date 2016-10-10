
export const fetchLikes = (callback) => {
  $.ajax({
    url: '/api/likes',
    method: 'GET',
    success: callback
  })
};

export const like = (track_id, callback) => {
  $.ajax({
    url: '/api/likes',
    method: 'POST',
    dataType: 'json',
    data: {like: { track_id }},
    success: callback
  })
};

export const unlike = (track_id, callback) => {
  $.ajax({
    url: '/api/likes',
    method: 'DELETE',
    dataType: 'json',
    data: {like: { track_id }},
    success: callback
  })
};
