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
