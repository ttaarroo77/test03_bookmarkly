Rails.application.routes.draw do
  devise_for :users

  # ルートパスの設定
  root "home#index"

  # ブックマークのリソース
  resources :bookmarks

  # ヘルスチェック用のエンドポイント
  get "up" => "rails/health#show", as: :rails_health_check

  # マイページ関連のルート
  resource :profile, only: [:show, :edit, :update], controller: 'users'
end
