Rails.application.routes.draw do
  # OmniAuth routes
  get '/auth/google_oauth2/callback', to: 'sessions#create'
  get '/auth/failure', to: 'sessions#failure'

  namespace :api do
    namespace :v1 do
      resources :todos
      get '/current_user', to: 'users#current'
    end
  end

  # Health check
  get 'up' => 'rails/health#show', as: :rails_health_check
end
