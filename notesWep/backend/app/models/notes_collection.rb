# Libraries
require 'uuidtools'
require 'rails/mongoid'

class NotesCollection
  
  include Mongoid::Document
  include Mongoid::Timestamps

  # Fields
  field :notes, type: Array, default: []
  field :userId, type: String
  field :_id, type: String, default: ->{ SecureRandom.uuid.to_s} 
  field :name, type: String
  field :bgColor, type: String,  default: ''
  
  # Validations
  validates_uniqueness_of :_id
  validates_presence_of :_id, :name, :userId
  
end
