export const search = (string, callback) => {
  $.ajax({
    url: '/api/search/',
    method: 'GET',
    success: callback,
    dataType: 'json',
    data: { search: { string } }
  });
}
