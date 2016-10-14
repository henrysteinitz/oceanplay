retracks = {}

if @retracks
  @retracks.each do |retrack|
    retracks[retrack.track_id] = true;
  end
end

json.retracks retracks
