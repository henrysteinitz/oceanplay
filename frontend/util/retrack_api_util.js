export const fetchRetracks = (callback) => {
  $.ajax({
    url: '/api/retracks/',
    method: 'GET',
    success: callback
  })
}

export const postRetrack = (id, callback) => {
  $.ajax({
    url: '/api/retracks/',
    method: 'POST',
    dataType: 'json',
    data: {retrack: { track_id: id }},
    success: callback
  })
};

export const deleteRetrack = (id, callback) => {
  $.ajax({
    url: `/api/retracks/${id}`,
    method: 'DELETE',
    success: callback
  })
};
