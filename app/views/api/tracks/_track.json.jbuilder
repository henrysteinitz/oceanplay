json.extract! track, :id, :title, :description, :artist_id

json.artist track.artist.username
json.audioUrl track.audio.url
json.artUrl track.art.url

json.comments(track.comments.order("created_at DESC")) do |comment|
  json.partial!('api/comments/comment', comment: comment)
end
