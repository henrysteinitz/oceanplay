export const uploadTrack = (trackData, callback) => {
  $.ajax({
    url:'api/tracks',
    method:'POST',
    processData: false,
    contentType: false,
    data: trackData,
    success: callback
  });
}

export const fetchTrack = (id, callback) => {
  $.ajax({
    url:`/api/tracks/${id}`,
    method:'GET',
    success: callback
  });
}
