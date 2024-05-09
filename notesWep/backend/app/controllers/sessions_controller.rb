class SessionsController < ApplicationController
  
  before_action :set_session, only: %i[show edit update destroy]

  # GET /sessions
  def index
    # Retrieve all sessions (admin only)
    adminAuthorize! Current.user
    @sessions = Session.all
  end

  # GET /sessions/1
  def show
    # Show a specific session
  end

  # GET /sessions/new
  def new
    # Initialize session parameters for new session
    session[:userType] = "NONE"
    session[:_id] = "NONE"
    session[:userEmail] = "NONE"
    @session = Session.new
  end

  # GET /sessions/1/edit
  def edit
  end

  # POST /sessions
  def create
    # Create a new session
    @current_user = User.find_by(email: session_params[:userEmail])
    if !@current_user
      flash.now.alert = "The email '#{session_params[:userEmail]}' was not valid."
      redirect_to login_path
    elsif @current_user.password == session_params[:password]
      aux = Session.find_by(userEmail: session_params[:userEmail])
      if !aux.nil?
        aux.delete
      end
      @session = Session.new(session_params)
      @session[:userType] = @current_user.userType
      @session.save!
      session[:_id] = @session._id
      session[:userEmail]= @session.userEmail
      session[:userType]= @session.userType
      if @current_user.userType == "ADMIN"
        redirect_to users_path
      else
        redirect_to notesUser_path(@current_user.email)
      end
    else
      flash.now.alert = "The password was not valid."
      redirect_to '/sessions/new'
    end
  end

  # DELETE /sessions/1
  def destroy
    if session[:_id] != "NONE"
      @session = Session.find_by(_id: params[:id])
      user= User.find_by(email: @session[:userEmail])
      userAuthorize! user
      @session.destroy
      flash.now.alert = "Successfully logged out!"
    end
    if session[:userType] == "ADMIN"
      redirect_to '/sessions'
    else
      session[:_id] = "NONE"
      session[:userEmail] = "NONE"
      session[:userType] = "NONE"
      redirect_to '/sessions/new'
    end
  end

  private
  # Use callbacks to share common setup or constraints between actions.
  def set_session
    @session = Session.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def session_params
    params.require(:session).permit(:_id, :token, :userEmail, :userType, :password)
  end
end
