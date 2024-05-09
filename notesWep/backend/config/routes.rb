Rails.application.routes.draw do

  resources :sessions
  resources :users
  resources :notes
  resources :notes_collections
  resources :share
  resources :friendships
  resources :friends_requests

  # Users
  get '/users/promote/:id', to: 'users#promote'
  get '/users/demote/:id', to: 'users#demote'

  # Share
  post '/shares/share', to: 'shares#shareNote'
  post '/share_collection/shareCollection', to: 'share_collection#shareCollection'
  get'shareCollection', to: 'notes_collections#share'

  # Notes & Collections
  post 'notes_collections/:collection_id/notes/:id', to: 'notes_collections#addNote'
  get 'add', to: 'notes_collections#add'
  get 'removeNote', to: 'notes_collections#removeNote'
  get 'getAdd', to: 'notes_collections#getAdd'
  get 'getShareCollection', to: 'notes_collections#getShare'
  delete 'notes_collections/:collection_id/notes/:id', to: 'notes_collections#removeNote'
  
  # Friendship
  get'newFriendRequest', to: 'friends_requests#create'
  get'allow/:friendId/:userId', to: 'friends_requests#allow'
  get'deny/:friendId/:userId', to: 'friends_requests#deny'
  get'destroyFriendship', to: 'friendships#destroy'
  get'friendsRequests_list/:friendId', to: 'friends_requests#index'
  get'sendRequestsList/:userId', to: 'friends_requests#new'
  get'sendRequests/:userId/:friendId', to: 'friends_requests#create'
  get'friendShips_list/:userId', to: 'friendships#index'

end
