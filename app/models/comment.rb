class Comment < ApplicationRecord
  validates :body, :user_id, :track_id, :time, presence: true

  belongs_to :user
  belongs_to :track
end
