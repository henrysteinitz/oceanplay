class Retrack < ApplicationRecord
  validates :track_id, :user_id, null: false
end
