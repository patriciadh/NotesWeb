class FriendsRequestsController < ApplicationController
  before_action :set_friends_request, only: %i[show edit update destroy]

  # GET /friends_requests
  def index
    # Retrieve friend requests for a specific friend
    if params[:friendId]
      @friends_requests = FriendsRequest.where(friendId: params[:friendId])
    end
    render json: @friends_requests
  end

  # GET /friends_requests/1
  def show
    # Show a specific friend request
  end

  # GET /friends_requests/new
  def new
    # Create a new friend request
    @friends_request = FriendsRequest.new
    @auxFriendsRequest = Friendship.where(friendId: params[:userId])
    @users2 = User.all
    @users1 = @users2.to_a

    @auxFriendsRequest.each do |aux|
      @user = User.find_by(_id: aux.userId)
      @users1.delete(@user)
    end
    @user1 = User.find_by(_id: params[:userId])
    @users1.delete(@user1)
    @users = @users1
    render json: @users
  end

  # POST /friends_requests
  def create
    # Create a new friend request
    if params[:userId] && params[:friendId]
      @friends_request = FriendsRequest.new(friends_request_params)
      @friends_request.save
    end
  end

  # Allow a friend request
  def allow
    @friendRequest = FriendsRequest.where(friendId: params[:friendId], userId: params[:userId])
                                    .or(FriendsRequest.where(friendId: params[:userId], userId: params[:userId]))
                                    .to_a
    @friendship = Friendship.new(friendId: @friendRequest[0].friendId, userId: @friendRequest[0].userId)
    if @friendship.save
      @friendRequest.each(&:destroy)
    end
  end

  # Deny a friend request
  def deny
    @friendRequest = FriendsRequest.where(friendId: params[:friendId], userId: params[:userId])
                                    .or(FriendsRequest.where(friendId: params[:userId], userId: params[:userId]))
                                    .to_a
    if @friendRequest
      @friendRequest.each(&:destroy)
    end
  end

  private
  # Use callbacks to share common setup or constraints between actions.
  def set_friends_request
    # Set the friend request for actions that require it
    @friends_request = FriendsRequest.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def friends_request_params
    # Define permitted parameters for creating a friend request
    params.permit(:userId, :friendId)
  end
  
end