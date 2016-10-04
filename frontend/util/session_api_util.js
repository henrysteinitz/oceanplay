
export const signup = (user, success) => {
  $.ajax({
    url: '/api/users',
    method: 'POST',
    dataType: 'json',
    data: {user},
    success
  });
}
