class FriendshipsController < ApplicationController
  before_action :set_friendship, only: %i[show edit update destroy]

  # GET /friendships
  def index
    # If a userId is provided in the params, filter friendships accordingly
    if params[:userId]
      @friendships = Friendship.where(friendId: params[:userId]).or(Friendship.where(userId: params[:userId]))
    else 
      # Otherwise, fetch all friendships
      @friendships = Friendship.all
    end
    # Render friendships as JSON
    render json: @friendships
  end

  # GET /friendships/new
  def new
    # Initialize a new friendship object
    @friendship = Friendship.new
  end

  # POST /friendships
  def create
    # Check if the current user is an admin or a regular user
    if Current.user.userType == "ADMIN" || Current.user.userType == "USER"
      # Create a new friendship object with the provided params
      @friendship = Friendship.new(friendship_params)
      # If the friendship is successfully saved, redirect to friendships index
      if @friendship.save
        redirect_to "/friendships"
      end
    else
      # If the current user is not authorized, redirect to login page
      redirect_to "/sessions/new"
    end
  end

  # DELETE /friendships/1
  def destroy
    # Check if the current user is an admin or a regular user
    if Current.user.userType == "ADMIN" || Current.user.userType == "USER"
      # Find the friendship by ID and destroy it
      @friendship = Friendship.find_by(_id: params[:_id])
      if @friendship.destroy
        redirect_to "/friendships"
      end
    else
      # If the current user is not authorized, redirect to login page
      redirect_to "/sessions/new"
    end
  end
  
  private

  # Set the friendship object before performing certain actions
  def set_friendship
    @friendship = Friendship.find(params[:_id])
  end

  # Define the parameters permitted for creating a friendship
  def friendship_params
    params.permit(:userId, :friendId)
  end
end
