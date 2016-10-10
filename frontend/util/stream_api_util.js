export const fetchStream = (tab, callback) => {
  $.ajax({
    url: '/api/stream/',
    method: 'GET',
    dataType: 'json',
    data: {stream: { tab }},
    success: callback
  })
};
