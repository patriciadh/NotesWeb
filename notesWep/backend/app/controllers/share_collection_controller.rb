class ShareCollectionController < ApplicationController
  
  # Action to render the form for creating a new share collection
  def new
    @share_collection = ShareCollection.new
  end

  # Action to share a collection
  def shareCollection
    puts params # Debugging: Output the parameters received
    if NotesCollection.find_by(:_id => params[:collectionId]) # Check if the collection exists
      @notes_collection = NotesCollection.find(params[:collectionId]) # Find the collection
      @shareCollection = ShareCollection.new(shareCollection_params) # Create a new share collection instance

      if @shareCollection.save # Save the share collection
        # Render a JSON response upon successful creation
        render json: @shareCollection, status: :created 
      else
        # Render errors if share collection creation fails
        render json: @shareCollection.errors, status: :unprocessable_entity 
      end

    end
  end

  private
  # Define strong parameters for sharing a collection
  def shareCollection_params
    params.permit(:authorId, :friendId, :collectionId)
  end
end
