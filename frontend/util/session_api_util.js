
export const signup = (user, success) => {
  $.ajax({
    url: '/api/users',
    method: 'POST',
    dataType: 'json',
    data: {user},
    success
  });
}

export const signin = (user, success) => {
  $.ajax({
    url: '/api/session',
    method: 'POST',
    dataType: 'json',
    data: {user},
    success
  });
}
