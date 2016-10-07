Rails.application.routes.draw do
  root to: 'static_pages#root'

  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create, :show]
    resource :session, only: [:create, :destroy]
    resources :tracks, only: [:create, :show]
  end

  get 'api/users/:id/full', to:  'api/users#show_full' 
end
