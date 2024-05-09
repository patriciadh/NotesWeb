class NotesController < ApplicationController
  before_action :set_note, only: %i[show update destroy]

  # GET /notes
  def index
    # Retrieves notes based on user or returns all notes if no user specified
    if params[:user].present?
      @notes = Note.where(user: params[:user])
      # Retrieves noteIds_list based on friendId and user
      noteIds_list = Share.where(friendId: params[:user]).pluck(:noteId)

      noteIds_list.each do |noteId|
        # Retrieves notes based on noteId and adds them to @notes
        @notes += Note.where(id: noteId)
      end
    else
      @notes = Note.all
    end
    render json: @notes
  end

  # GET /notes/1
  def show
    render json: @note
  end

  # POST /notes
  def create
    # Creates a new note
    puts note_params
    @note = Note.new(note_params)
    if !@note.imageURL.blank?
      # Save the image and get its public URL
      public_url = save_image(@note.imageURL) 
      # Update the note's imageURL attribute with the public URL
      @note.imageURL = public_url 
    end
    if @note.save
      render json: @note, status: :created, location: @note
    else
      render json: @note.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /notes/1
  def update
    # Updates an existing note
    if @note.update(note_params)
      render json: @note
    else
      render json: @note.errors, status: :unprocessable_entity
    end
  end

  # DELETE /notes/1
  def destroy
    # Deletes an existing note
    puts params[:id]
    note = Note.where(_id: params[:id]).first
    if !note.imageURL.blank?
      # Delete the associated image
      delete_picture(note.imageURL) 
    end
    note.destroy
  end

  private
    # Sets the note instance variable before performing actions on it
    def set_note
      @note = Note.find(params[:id])
    end

    # Permits only trusted parameters
    def note_params
      params.permit(:created_at, :updated_at, :_id, :title, :content, :imageURL, :isShared, :bgColor, :user)
    end

  # Saves the image to Google Cloud Storage and returns its public URL
  def save_image(base64)
    # Extract image data from base64
    image_parts = base64.match(/data:(?<type>.*?);base64,(?<data>.*)/m)
    image_type = image_parts[:type].split('/').last
    image_data = Base64.decode64(image_parts[:data])
    image_binary_data = Base64.decode64(image_parts[2])
    image_file = StringIO.new(image_binary_data)

    require "google/cloud/storage"
    require "google/cloud/storage/file"
    storage = Google::Cloud::Storage.new(
      project_id: "notesweb-11b4b",
      credentials: "notesweb.json"
    )
  
    bucket = storage.bucket("notesweb-11b4b.appspot.com")
    bucket_folder = "pictures"
    file = bucket.create_file(image_file, "#{bucket_folder}/#{SecureRandom.uuid}.#{image_type}")
    file.acl.public! # Set file ACL to public
    public_url = file.public_url
    return public_url
  end

  # Deletes the image from Google Cloud Storage
  def delete_picture(public_url)
    require "google/cloud/storage"
    require "google/cloud/storage/file"
    
    storage = Google::Cloud::Storage.new(
      project_id: "notesweb-11b4b",
      credentials: "notesweb.json"
    )

    bucket_name = "notesweb-11b4b.appspot.com"
    object_path = public_url.sub("https://storage.googleapis.com/#{bucket_name}/", "")
    bucket = storage.bucket(bucket_name)
    file = bucket.file(object_path)
    file.delete
  end
end
