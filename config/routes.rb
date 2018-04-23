Rails.application.routes.draw do
  # get "microposts/by_user/:user_id", to: 'micropost#by_user'
  resources :microposts
  resources :users
 
  get "microposts/search/:user_id", to: 'micropost#search'

  # resources :microposts do
  #   collection do
  #     get 'search'  # , on: :collection
  #   end
  # end

  # get "microposts/by_user/:user_id", to: 'micropost#by_user'
  root "users#index"
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
