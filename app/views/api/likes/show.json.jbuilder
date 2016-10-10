likes = {}

if @likes
  @likes.each do |like|
    likes[like.track_id] = true;
  end
end

json.likes likes
