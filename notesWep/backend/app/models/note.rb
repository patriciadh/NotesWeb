class Note
  
  include Mongoid::Document
  include Mongoid::Timestamps

  # Fields
  field :user, type: BSON::ObjectId,  default: ''
  field :title, type: String, default: ''
  field :content, type: String,  default: ''
  field :bgColor, type: String,  default: ''
  field :imageURL, type: String, default: ''
  field :isShared, type: Mongoid::Boolean,  default: ''

  # Validations
  validates_presence_of :_id, :title, :content
  validates_uniqueness_of :_id
end
