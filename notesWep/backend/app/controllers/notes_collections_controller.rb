class NotesCollectionsController < ApplicationController
  before_action :set_notes_collection, only: %i[show edit update destroy]

  # GET /notes_collections
  def index
    # Retrieve notes collections based on user ID and shared collections
    if params[:userId].present?
      @notes = NotesCollection.where(userId: params[:userId])
      collectionIds_list = ShareCollection.where(friendId: params[:userId]).pluck(:collectionId)
      collectionIds_list.each do |collectionId|
        @notes += NotesCollection.where(id: collectionId)
      end
    else
      @notes = NotesCollection.all
    end
    render json: @notes
  end

  # GET /notes_collections/1
  def show
    # Show a specific notes collection and its associated notes
    notes = @notes_collection.notes.map { |note_id| Note.find(note_id) }
    render json: { notes_collection: @notes_collection, notes: notes }
  end

  # GET /notes_collections/new
  def new
    # Create a new notes collection if the user is logged in
    if Current.user
      @notes_collection = NotesCollection.new
    else
      redirect_to "/sessions/new"
    end
  end

  # GET /notes_collections/1/edit
  def edit
    # Edit a notes collection if the user is authorized
    if Current.user
      if Current.user.userType == "ADMIN" && NotesCollection.find_by(_id: params[:id])
        @notecollection = NotesCollection.find_by(_id: params[:id])
      elsif Current.user.userType == "USER" && NotesCollection.find_by(_id: params[:id], userEmail: Current.user.email)
        @notecollection = NotesCollection.find_by(_id: params[:id])
      else
        redirect_to "/notes_collections"
      end
    else
      redirect_to "/sessions/new"
    end
  end

  # POST /notes_collections
  def create
    # Create a new notes collection
    @notes_collection = NotesCollection.new(notes_collection_params)
    if @notes_collection.save
      render json: @notes_collection, status: :created, location: @notes_collection
    else
      render json: @notes_collection.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /notes_collections/1
  def update
    # Update a notes collection
    if @notes_collection.update(notes_collection_params)
      render json: @notes_collection
    else
      render json: @notes_collection.errors, status: :unprocessable_entity
    end
  end

  # DELETE /notes_collections/1
  def destroy
    # Delete a notes collection and its associated notes
    notecollection = NotesCollection.where(_id: params[:id]).first
    notecollection.notes.each do |note_id|
      note = Note.where(_id: note_id).first
      if !note.imageURL.blank?
        delete_image(note.imageURL)
      end
      note.destroy
    end
    notecollection.destroy
  end

  # Get notes collection to add notes
  def getAdd
    if Current.user.userType == "ADMIN" || NotesCollection.find_by(_id: params[:_id], userEmail: Current.user.email)
      @notes_collection = NotesCollection.find(params[:_id])
      if Current.user == "ADMIN"
        @notes = Note.all
      else
        usernotes = Note.where(user: Current.user._id).to_a
        notes = []
        if !usernotes.nil?
          if usernotes.kind_of?(Array)
            usernotes.each do |item|
              note = Note.find(item._id)
              notes.append(note)
            end
          else
            note = Note.find(usernotes.note_id)
            notes.append(note)
          end
        end
        @notes = notes
      end
      render :add
    elsif Current.user == "USER"
      redirect_to "/notes_collections"
    else
      redirect_to "/sessions/new"
    end
  end

  # Add a note to a collection
  def addNote
    @notes_collection = NotesCollection.find(params[:collection_id])
    note_id = params[:id]
    @notes_collection.notes << note_id
    if @notes_collection.save
      render json: @notes_collection, status: :created, location: @notes_collection
    else
      render json: @notes_collection.errors, status: :unprocessable_entity
    end
  end

  # Remove a note from a collection
  def removeNote
    @notes_collection = NotesCollection.find(params[:collection_id])
    note_id = params[:id]
    @notes_collection.notes.delete(note_id)
    if @notes_collection.save
      render json: @notes_collection, status: :created, location: @notes_collection
    else
      render json: @notes_collection.errors, status: :unprocessable_entity
    end
  end

  # Get users to share a collection with
  def getShare
    if  Current.user.userType == "ADMIN" || NotesCollection.find_by(_id: params[:_id], userEmail: Current.user.email)
      @notecollection = NotesCollection.find(params[:_id])
      users = User.all
      @users = []
      users.each do |item|
        if Friendship.find_by(friendId: item._id, userId: Current.user._id )|| Friendship.find_by(friendId: Current.user._id, userId: item._id)
          @users.append(item)
        end
      end
      render :share
    elsif Current.user.userType == "USER"
      redirect_to "/notes_collections"
    else
      redirect_to "/sessions/new"
    end
  end

  # Share a collection with other users
  def share
    if Current.user
      if Current.user.userType == "ADMIN" || NotesCollection.find_by(_id: params[:_id], userEmail: Current.user.email)
        @aux=NotesCollection.find(params[:_id])
        @notes_collection = NotesCollection.new(userEmail: params[:userEmail], name: @aux.name, notes: @aux.notes)
        @notes_collection.save!
      end
      redirect_to "/notes_collections"
    else
      redirect_to "/sessions/new"
    end
  end

  private
  # Use callbacks to share common setup or constraints between actions.
  def set_notes_collection
    @notes_collection = NotesCollection.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def notes_collection_params
    params.permit(:id, :name, :userId, :bgColor)
  end
end