json.extract! track, :id, :title, :description, :artist_id

json.artist track.artist.username
json.audioUrl track.audio.url
json.artUrl track.art.url
