# User model
class User

  include Mongoid::Document
  include Mongoid::Timestamps

  # Fields
  field :isEnable, type: Mongoid::Boolean, default: ->{ true }
  field :name, type: String
  field :surname, type: String
  field :email, type: String
  field :password, type: String
  field :userType, type: String, default: ->{ "USER" }

  # Validations
  validates :email, presence: true, uniqueness: true,
            format: {
              with: /\A([\w+\-].?)+@[a-z\d\-]+(\.[a-z]+)*\.[a-z]+\z/i,
              message: :invalid
            }
  validates :name, presence: true, uniqueness: true,
            length: { in: 3..20 },
            format: {
              with: /\A[a-z0-9A-Z]+\z/,
              message: :invalid
            }
  validates :surname, presence: true,
            length: { in: 3..20 },
            format: {
              with: /\A[a-z0-9A-Z]+\z/,
              message: :invalid
            }

  # Custom validation method to check password requirements
  validate :password_requirements_are_met
  validates_presence_of :_id, :password

  # Method to check if password meets requirements
  def password_requirements_are_met
    # Rules for password
    rules = {
      "at least one uppercase letter" => /[A-Z]+/,
      "at least one lowercase letter" => /[a-z]+/,
      "at least one special character" => /[^A-Za-z0-9]+/,
      "at least one digit" => /\d+/
    }

    password_string = password.to_s

    rules.each do |message, regex|
      errors.add(:password, message) unless password_string.match(regex)
    end
  end
end