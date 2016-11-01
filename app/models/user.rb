class User < ApplicationRecord
  validates :username, :session_token, uniqueness: true, presence: true
  validates :password_digest, presence: true
  validates :password, length: {minimum: 7, allow_nil: true}

  after_initialize :ensure_session_token

  attr_reader :password

  has_attached_file :panelpic, :default_url => 'ocean.jpg'
  validates_attachment_content_type :panelpic, content_type: /\Aimage\/.*\Z/

  has_attached_file :profpic, :default_url => 'user.png'
  validates_attachment_content_type :profpic, content_type: /\Aimage\/.*\Z/

  has_many :tracks,
    class_name: 'Track',
    foreign_key: :artist_id,
    primary_key: :id

  has_many :comments

  has_many :in_follows,
    class_name: 'Follow',
    foreign_key: :followed_id,
    primary_key: :id

  has_many :followers,
    through: :in_follows

  has_many :out_follows,
    class_name: 'Follow',
    foreign_key: :follower_id,
    primary_key: :id

  has_many :followeds,
    through: :out_follows

  def self.find_by_credentials(username, password)
    user = User.find_by(username: username)
    return user if user.isPassword?(password)
    nil
  end

  def ensure_session_token
    self.session_token ||= new_session_token
  end

  def new_session_token
    self.session_token = SecureRandom.base64
    while User.find_by(session_token: self.session_token)
      self.session_token = SecureRandom.base64
    end
    self.session_token
  end

  def reset_session_token
    self.session_token = ensure_session_token
    self.save
    self.session_token
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def isPassword?(password)
    BCrypt::Password.new(self.password_digest) == password
  end

end
