require "test_helper"

class UsersControllerTest < ActionDispatch::IntegrationTest
  
  # Set up a user for testing
  setup do
    @user = users(:one)
  end

  # Test for getting the index of users
  test "should get index" do
    get users_url, as: :json
    assert_response :success
  end

  # Test for creating a new user
  test "should create user" do
    assert_difference("User.count") do
      post users_url, params: { user: { creationDate: @user.creationDate, email: @user.email, isEnable: @user.isEnable, name: @user.name, password: @user.password, surname: @user.surname } }, as: :json
    end
    assert_response :created
  end

  # Test for destroying a user
  test "should destroy user" do
    assert_difference("User.count", -1) do
      delete user_url(@user), as: :json
    end
    assert_response :no_content
  end

  # Test for updating a user
  test "should update user" do
    patch user_url(@user), params: { user: { creationDate: @user.creationDate, email: @user.email, isEnable: @user.isEnable, name: @user.name, password: @user.password, surname: @user.surname } }, as: :json
    assert_response :success
  end

  # Test for showing a user
  test "should show user" do
    get user_url(@user), as: :json
    assert_response :success
  end
end