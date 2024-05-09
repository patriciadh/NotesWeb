class ApplicationController < ActionController::API
    # Define a custom exception for unauthorized access
    class NotAuthorizedError < StandardError; end
  
    # Rescue from NotAuthorizedError and redirect to login page with a message
    rescue_from NotAuthorizedError do
      redirect_to '/sessions/new', alert: t('common.not_authorized')
    end
  
    private
      
    # Set the current user based on session data
    def set_current_user
      Current.user = User.find_by(email: session[:userEmail]) if session[:userEmail]
    end
  
    # Protect pages by redirecting to login page if user is not logged in
    def protect_pages
      redirect_to '/sessions/new' unless Current.user
    end
  
    # Authorize only admin users
    def adminAuthorize!(user)
      is_allowed = user.userType == "ADMIN"
      raise NotAuthorizedError unless is_allowed
    end
  
    # Authorize only the user who owns the resource or admin users
    def userAuthorize!(user)
      if user._id != Current.user._id && Current.user.userType != "ADMIN"
        raise NotAuthorizedError
      end
    end
  end