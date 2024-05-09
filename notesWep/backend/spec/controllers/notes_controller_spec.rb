# RSpec tests for NotesController
RSpec.describe NotesController, type: :controller do
  describe "POST #create" do
    it "creates a new note" do
      # Expectation: Creating a new note increases the Note count by 1
      expect {
        post :create, params: { title: "Test", content: "Testing with RSpec" }
      }.to change(Note, :count).by(1)
    end

    after do
      # Clean up: Delete the created note after the test
      Note.where(title: "Test").destroy
    end
  end

  describe "GET #index" do
    let!(:note1) { Note.create(title: "Test 1", content: "This is the note for the test 1") }
    let!(:note2) { Note.create(title: "Test 2", content: "This is the note for the test 2") }

    it "returns all notes" do
      # Expectation: The index action returns all notes
      get :index
      expect(assigns(:notes).count).to eq(Note.count)
    end

    after do
      # Clean up: Delete the created notes after the test
      Note.where(title: "Test 1").destroy
      Note.where(title: "Test 2").destroy
    end
  end

  describe "DELETE #destroy" do
    context "when note is successfully deleted" do
      let!(:note) { FactoryBot.create(:note) }

      it "deletes the new note" do
        # Expectation: Deleting a note decreases the Note count by 1
        expect {
          delete :destroy, params: { id: note.id }
        }.to change(Note, :count).by(-1)
      end
    end
  end
end