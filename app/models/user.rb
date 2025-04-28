class User < ApplicationRecord
  validates :username, presence: true, length: { minimum: 10, maximum: 50 }
  validates :password, presence: true, length: { minimum: 12, maximum: 50 }
  validate :password_must_contain_letter_and_number

  def self.validate_username(username)
    username.length >= 10 && username.length <= 50
  end

  def self.validate_password(password)
    password.length >= 20 && password.length <= 50
  end

  private

  def password_must_contain_letter_and_number
    unless password&.match?(/[a-zA-Z]/) && password&.match?(/\d/)
      errors.add(:password, "must include at least one letter and one number")
    end
  end
end
