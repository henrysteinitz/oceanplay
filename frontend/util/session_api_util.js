
export const signup = (user, callback) => {
  $.ajax({
    url: '/api/users',
    method: 'POST',
    dataType: 'json',
    data: {user},
    success: callback
  });
}

export const signin = (user, callback) => {
  $.ajax({
    url: '/api/session',
    method: 'POST',
    dataType: 'json',
    data: {user},
    success: callback
  });
}

export const signout = (callback) => {
  $.ajax({
    url: 'api/session',
    method: 'DELETE',
    success: callback
  });
}
