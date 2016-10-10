json.array!(@stream) do |track|
  json.partial! 'api/tracks/track', track: track
end
