require 'uuidtools'
require 'rails/mongoid'

class ShareCollection

  include Mongoid::Timestamps
  include Mongoid::Document

  # Fields
  field :_id, type: String, default: ->{ SecureRandom.uuid.to_s}
  field :authorId, type: BSON::ObjectId
  field :collectionId, type: String
  field :friendId, type: BSON::ObjectId

  # Validations
  validates_uniqueness_of :_id
  validates_presence_of :authorId, :friendId

end
