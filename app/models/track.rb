class Track < ApplicationRecord

  validates :title, :artist_id, presence: true

  has_attached_file :audio
  validates_attachment_content_type :audio, content_type: [
    'audio/mpeg',
    'audio/x-mpeg',
    'audio/mp3',
    'audio/x-mp3',
    'audio/mpeg3',
    'audio/x-mpeg3',
    'audio/mpg',
    'audio/x-mpg',
    'audio/x-mpegaudio'
  ]

  has_attached_file :art
  validates_attachment_content_type :art, content_type: /\Aimage\/.*\Z/

  belongs_to :artist,
    class_name: 'User',
    foreign_key: :artist_id,
    primary_key: :id

  has_many :comments

end
