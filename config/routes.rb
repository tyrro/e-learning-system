Rails.application.routes.draw do
  root 'courses#index'

  resources :courses, except: %i(new edit show) do
    resources :lessons, except: %i(new edit show)
  end
end
