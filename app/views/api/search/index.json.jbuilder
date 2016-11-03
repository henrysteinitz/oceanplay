json.tracks @tracks do |track|
  json.partial! 'api/tracks/track', track: track
end

json.artists @artists do |artist|
  json.partial! 'api/users/user', user: artist
end
