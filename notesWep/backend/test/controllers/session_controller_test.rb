require "test_helper"

class SessionControllerTest < ActionDispatch::IntegrationTest
  
  # Test for creating a session
  test "should get create" do
    get session_create_url
    assert_response :success
  end

  # Test for destroying a session
  test "should get destroy" do
    get session_destroy_url
    assert_response :success
  end

  # Test for getting the new session page
  test "should get new" do
    get session_new_url
    assert_response :success
  end
end
