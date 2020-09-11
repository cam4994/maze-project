Rails.application.routes.draw do
  resources :scores, only: [:index, :create, :destroy]
  resources :mazes
  resources :users
  post '/login', to: 'sessions#create'
  get '/scores/easy', to: 'scores#easy'
  get '/scores/medium', to: 'scores#medium'
  get '/scores/hard', to: 'scores#hard'
end
