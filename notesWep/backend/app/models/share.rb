require 'uuidtools'
require 'rails/mongoid'

class Share

  include Mongoid::Document
  include Mongoid::Timestamps

  # Fields
  field :_id, type: String, default: ->{ SecureRandom.uuid.to_s}
  field :noteId, type: BSON::ObjectId
  field :friendId, type: BSON::ObjectId
  field :authorId, type: BSON::ObjectId

  # Validations
  validates_uniqueness_of :_id
  validates_presence_of :authorId, :friendId
end
