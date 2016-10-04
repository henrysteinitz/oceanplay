class User < ApplicationRecord
  validates :username, :session_token, uniqueness: true, presence: true
  validates :password_digest, presence: true
  validates :password, length: {minimum: 7, allow_nil: true}

  after_initialize :ensure_session_token

  attr_reader :password

  def self.find_by_credentials(username, password)
    user = User.find_by(username: username, password: password)

  end

  def ensure_session_token
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
    BCrypt.new(self.password_digest) == password
  end

end
