# Libraries
require 'uuidtools'
require 'rails/mongoid'

# Friendship model
class Friendship
  
  include Mongoid::Document
  include Mongoid::Timestamps

  # Fields
  field :_id, type: String, default: ->{ SecureRandom.uuid.to_s } # Unique identifier for the friendship
  field :userId, type: BSON::ObjectId 
  field :friendId, type: BSON::ObjectId 
  
  # Validations
  validates_presence_of :userId, :friendId 
  validates_uniqueness_of :_id 
end