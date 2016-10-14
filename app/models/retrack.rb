class Retrack < ApplicationRecord
  validates :track_id, :user_id, null: false
  validates_uniqueness_of :track_id, scope: [:user_id]

  belongs_to :track
  belongs_to :user
end
