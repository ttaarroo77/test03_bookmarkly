# Devise によるユーザー認証の実装

## 1. Deviseのセットアップ

### 1.1 Gemfileに追加
```ruby
gem 'devise'
```

### 1.2 インストール
```bash
bundle install
rails generate devise:install
```

### 1.3 初期設定
```ruby
# config/environments/development.rb
config.action_mailer.default_url_options = { host: 'localhost', port: 3000 }

# config/initializers/devise.rb
config.navigational_formats = ['*/*', :html, :json]  # JSON形式のリクエストに対応
```

## 2. Userモデルの作成

### 2.1 モデル生成
```bash
rails generate devise User
```

### 2.2 マイグレーション実行
```bash
rails db:migrate
```

### 2.3 Userモデルのカスタマイズ
```ruby
# app/models/user.rb
class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_many :bookmarks, dependent: :destroy
  
  validates :name, presence: true
  validates :email, presence: true, uniqueness: true
end
```

## 3. ビューのカスタマイズ

### 3.1 Deviseのビューを生成
```bash
rails generate devise:views
```

### 3.2 ログインフォーム（sessions/new.html.erb）
```erb
<div class="container py-5">
  <div class="row justify-content-center">
    <div class="col-md-6">
      <div class="card">
        <div class="card-body">
          <h2 class="card-title text-center mb-4">ログイン</h2>

          <%= form_for(resource, as: resource_name, url: session_path(resource_name)) do |f| %>
            <div class="mb-3">
              <%= f.label :email, class: "form-label" %>
              <%= f.email_field :email, autofocus: true, class: "form-control" %>
            </div>

            <div class="mb-3">
              <%= f.label :password, class: "form-label" %>
              <%= f.password_field :password, class: "form-control" %>
            </div>

            <% if devise_mapping.rememberable? %>
              <div class="mb-3 form-check">
                <%= f.check_box :remember_me, class: "form-check-input" %>
                <%= f.label :remember_me, class: "form-check-label" %>
              </div>
            <% end %>

            <%= f.submit "ログイン", class: "btn btn-primary w-100" %>
          <% end %>

          <div class="mt-3 text-center">
            <%= render "devise/shared/links" %>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
```

## 4. コントローラーの設定

### 4.1 ApplicationControllerの設定
```ruby
# app/controllers/application_controller.rb
class ApplicationController < ActionController::Base
  before_action :configure_permitted_parameters, if: :devise_controller?
  protect_from_forgery unless: -> { request.format.json? }

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:name])
    devise_parameter_sanitizer.permit(:account_update, keys: [:name])
  end
end
```

### 4.2 APIモード対応
```ruby
# app/controllers/users/sessions_controller.rb
class Users::SessionsController < Devise::SessionsController
  respond_to :html, :json

  private

  def respond_to_on_destroy
    respond_to do |format|
      format.html { redirect_to root_path }
      format.json { head :no_content }
    end
  end
end
```

## 5. ルーティングの設定
```ruby
# config/routes.rb
Rails.application.routes.draw do
  devise_for :users, controllers: {
    sessions: 'users/sessions'
  }
  
  root 'bookmarks#index'
end
``` 