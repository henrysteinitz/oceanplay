json.track do
  json.partial! 'api/tracks/track', track: @retrack.track
end

json.id @retrack.id
json.status 200
json.retracker @retrack.user
json.retracker_id @retrack.id
json.retrackIndicator do
  json.set! @retrack.track.id, true
end
