require "test_helper"

class NotesControllerTest < ActionDispatch::IntegrationTest
  setup do
    # Set up a note for testing
    @note = notes(:one)
  end

  # Test for index action
  test "should get index" do
    get notes_url, as: :json
    assert_response :success
  end

  # Test for creating a note
  test "should create note" do
    assert_difference("Note.count") do
      post notes_url, params: { note: { content: @note.content, creationDate: @note.creationDate, imagePath: @note.imagePath, isShared: @note.isShared, title: @note.title } }, as: :json
    end
    assert_response :created
  end

  # Test for destroying a note
  test "should destroy note" do
    assert_difference("Note.count", -1) do
      delete note_url(@note), as: :json
    end
    assert_response :no_content
  end

  # Test for updating a note
  test "should update note" do
    patch note_url(@note), params: { note: { content: @note.content, creationDate: @note.creationDate, imagePath: @note.imagePath, isShared: @note.isShared, title: @note.title } }, as: :json
    assert_response :success
  end

  # Test for showing a note
  test "should show note" do
    get note_url(@note), as: :json
    assert_response :success
  end
end
