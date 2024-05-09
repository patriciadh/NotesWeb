# RSpec tests for UsersController
RSpec.describe UsersController, type: :controller do
    
    describe "POST #create" do
      context "with valid attributes" do
        it "creates a new user" do
          # Expectation: Creating a new user increases the User count by 1
          expect {
            post :create, params: { name: "UserTest", surname: "SurnameTest", email: "user@test.com", password: "userTest1!" }
          }.to change(User, :count).by(1)
        end
  
        after do
          # Clean up: Delete the created user after the test
          User.where(email: "user@test.com").destroy
        end
      end
  
      context "with invalid attributes" do
        it "does not create a new user" do
          # Expectation: Trying to create a user with invalid attributes does not change the User count
          expect {
            post :create, params: { name: "UserTest1", surname: "SurnameTest1", email: "123", password: "password" }
          }.to_not change(User, :count)
        end
      end
    end

    describe "DELETE #destroy" do
      before do
        # Create a user before the test
        @user = User.create(name: "UserTest", surname: "SurnameTest", email: "user@test.com", password: "userTest1!")
      end  
  
      it "deletes the user" do
        # Expectation: Deleting a user decreases the User count by 1
        expect {
          delete :destroy, params: { id: @user.id }
        }.to change(User, :count).by(-1)
      end
    end
  
    describe "PUT #update" do
      let(:user) { User.create(name: "UserTest", surname: "SurnameTest", email: "user@test.com", password: "userTest1!") } 
  
      context "with valid attributes" do
        it "updates the user" do
          # Expectation: Updating user attributes changes the user's name and surname
          put :update, params: { id: user.id, name: "UserTestU", surname: "SurnameTestU" }
          user.reload
          expect(user.name).to eq "UserTestU"
          expect(user.surname).to eq "SurnameTestU"
        end
      end
  
      context "with invalid attributes" do
        it "does not update the user" do
          original_name = user.name
          put :update, params: { id: user.id, name: "" }
          user.reload
          expect(user.name).to eq original_name
        end
      end
  
      after do
        # Clean up: Delete the created user after the test
        user.destroy
      end
    end
  end  