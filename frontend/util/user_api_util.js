export const fetchFullUser = (id, callback) => {
  $.ajax({
    url: `/api/users/${id}/full`,
    method: 'GET',
    success: callback
  });
};

export const fetchUser = (id, callback) => {
  $.ajax({
    url: `/api/users/${id}/full`,
    method: 'GET',
    success: callback
  });
};

export const followUser = (id, callback) => {
  $.ajax({
    url: '/api/follow/',
    method: 'POST',
    dataType: 'json',
    data: {follow: {followed_id: id}},
    success: callback
  });
};

export const unfollowUser = (id, callback) => {
  $.ajax({
    url: '/api/follow/',
    method: 'DELETE',
    dataType: 'json',
    data: {follow: {followed_id: id}},
    success: callback
  });
};

export const checkFollow = (id, callback) => {
  $.ajax({
    url: '/api/follow/',
    method: 'GET',
    dataType: 'json',
    data: {follow: {followed_id: id}},
    success: callback
  })
}
