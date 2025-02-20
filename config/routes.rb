Rails.application.routes.draw do
  devise_for :users

  # ルートパスの設定
  root "home#index"

  # ブックマークのリソース
  resources :bookmarks

  # ヘルスチェック用のエンドポイント
  get "up" => "rails/health#show", as: :rails_health_check
end
