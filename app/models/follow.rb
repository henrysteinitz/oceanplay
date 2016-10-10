class Follow < ApplicationRecord
  validates :follower, :followed, presence: true
  validates_uniqueness_of :follower_id, scope: [:followed_id]

  belongs_to :follower,
    class_name: 'User',
    foreign_key: :follower_id,
    primary_key: :id

  belongs_to :followed,
    class_name: 'User',
    foreign_key: :followed_id,
    primary_key: :id
end
