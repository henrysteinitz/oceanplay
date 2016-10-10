json.user do
  json.partial! 'api/users/user', user: @user
end

tracks = @user.tracks.order('created_at DESC').map do |track|
  {
    id: track.id,
    title: track.title,
    artist: track.artist.username,
    artist_id: track.artist_id,
    audioUrl: track.audio.url,
    artUrl: track.art.url
  }
end

json.tracks tracks

json.status 200
