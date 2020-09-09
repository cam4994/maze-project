Rails.application.routes.draw do
  resources :scores
  resources :mazes
  resources :users
  post '/login', to: 'sessions#create'
  delete '/signout', to: 'sessions#destroy'
end
