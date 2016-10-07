json.user do
  json.partial! 'api/users/user', user: @user
end

tracks = @user.tracks.map do |track|
  {
    title: track.title,
    artist: track.artist.username,
    audioUrl: track.audio.url
  }
end

json.tracks tracks

json.status 200
