Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  get '/', to: 'application#render_react', as: :root
  get 'signup/*all', to: 'application#render_react', as: :signup
  get 'create-account', to: 'application#render_react', as: :create_account
  post '/api/password_strength', to: 'api#password_strength', as: :api_password_strength
  post '/api/create_account', to: 'api#create_account', as: :api_create_account

end
