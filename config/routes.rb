Rails.application.routes.draw do
  namespace :api do
    resources :events, only: %i[index show create update destroy]
  end
end
