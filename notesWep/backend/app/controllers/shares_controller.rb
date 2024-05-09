class SharesController < ApplicationController
  # Action to render the form for creating a new share
  def new
    @share = Share.new
  end

  # Action to share a note
  def shareNote
    # Debugging: Output the parameters received
    puts params 
    # Check if the note exists
    if Note.find_by(:_id => params[:noteId]) 
      # Find the note
      @note = Note.find(params[:noteId]) 
      # Update the note to mark it as shared
      @note.update(:isShared => true) 
      # Create a new share instance
      @shareNote = Share.new(share_params) 
      if @shareNote.save # Save the share
        # Render a JSON response upon successful creation
        render json: @shareNote, status: :created, location: @shareNote 
      else
        # Render errors if share creation fails
        render json: @shareNote.errors, status: :unprocessable_entity
      end
    end
  end

  private
  # Define strong parameters for sharing
  def share_params
    params.permit(:authorId, :friendId, :noteId)
  end
end