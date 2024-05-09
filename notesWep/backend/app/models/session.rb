# Libraries
require 'rails/mongoid'
require 'uuidtools'

class Session

  include Mongoid::Document
  include Mongoid::Timestamps

  # Fields
  field :token, type: String, default: ->{ SecureRandom.uuid.to_s} 
  field :_id, type: String, default: ->{ SecureRandom.uuid.to_s} 
  field :userEmail, type: String
  field :userType, type: String
  field :password, type: String

  # Validations
  validates_presence_of :_id, :token
  validates_uniqueness_of :_id, :token

end