export const fetchStream = (tab, callback, artist_id) => {
  $.ajax({
    url: '/api/stream/',
    method: 'GET',
    dataType: 'json',
    data: {stream: { tab, artist_id }},
    success: callback
  })
};
