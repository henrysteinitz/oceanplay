export const uploadTrack = (trackData, callback) =>{
  console.log(trackData);
  $.ajax({
    url:'api/tracks',
    method:'POST',
    processData: false,
    contentType: false,
    data: trackData,
    success: callback
  });
}
