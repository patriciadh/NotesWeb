class UsersController < ApplicationController

  before_action :set_user, only: %i[show edit update destroy]

  # GET /users
  def index
    if params[:email].present?
      @users = User.find_by(email: params[:email]) # Find user by email if present
    else
      @users = User.all # Fetch all users
    end
    render json: @users # Render JSON response
  end

  # GET /users/1
  def show
    render json: @user # Render JSON response with user details
  end

  # GET /users/new
  def new
    @user = User.new # Initialize a new user object
  end

  # GET /users/1/edit
  def edit
  end

  # POST /users
  def create
    @user = User.new(user_params) # Create a new user with permitted parameters

    if @user.save # If user is successfully saved
      render json: @user, status: :created, location: @user # Render JSON response with user details
    else
      render json: @user.errors, status: :unprocessable_entity # Render errors if user creation fails
    end
  end

  # PATCH/PUT /users/1
  def update
    if @user.update(user_params) # If user is successfully updated
      # Render JSON response with updated user details
      render json: @user, status: :created, location: @user 
    else
      # Render errors if user update fails
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # DELETE /users/1
  def destroy
    puts params[:id] # Debugging: Output user ID to console
    user = User.where(_id: params[:id]).first # Find and delete user by ID
    user.destroy
  end

  # Promote user to admin
  def promote
    @user = User.find(params[:id])
    @user.update(:userType => "ADMIN") # Update user type to admin
    redirect_to users_path # Redirect to users index
  end

  # Demote admin to regular user
  def demote
    @user = User.find(params[:id])
    @user.update(:userType => "USER") # Update user type to regular user
    redirect_to users_path # Redirect to users index
  end

  private
  # Use callbacks to set common user details
  def set_user
    @user = User.find(params[:id])
  end

  def set_user_by_email
    @user = User.find(params[:email]) # Find user by email
  end

  # Only allow a list of trusted parameters through
  def user_params
    params.permit(:name, :surname, :email, :password, :creationDate, :isEnable, :userType, :id)
  end
end