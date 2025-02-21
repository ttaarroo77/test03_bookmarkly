# ログイン機能の実装

## 1. ログインフォームの作成

### 1.1 Deviseのビューを生成
```bash
rails generate devise:views
```

### 1.2 ログインフォームのカスタマイズ
```erb
# app/views/devise/sessions/new.html.erb
<div class="container py-5">
  <div class="row justify-content-center">
    <div class="col-md-6">
      <div class="card">
        <div class="card-body">
          <h2 class="card-title text-center mb-4">ログイン</h2>

          <%= form_for(resource, as: resource_name, url: session_path(resource_name)) do |f| %>
            <div class="mb-3">
              <%= f.label :email, "メールアドレス", class: "form-label" %>
              <%= f.email_field :email, autofocus: true, class: "form-control" %>
            </div>

            <div class="mb-3">
              <%= f.label :password, "パスワード", class: "form-label" %>
              <%= f.password_field :password, class: "form-control" %>
            </div>

            <% if devise_mapping.rememberable? %>
              <div class="mb-3 form-check">
                <%= f.check_box :remember_me, class: "form-check-input" %>
                <%= f.label :remember_me, "ログイン状態を保持", class: "form-check-label" %>
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

## 2. ナビゲーションバーの更新

```erb
# app/views/shared/_header.html.erb
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container">
    <%= link_to "Bookmarkly", root_path, class: "navbar-brand" %>
    
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
      <span class="navbar-toggler-icon"></span>
    </button>
    
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav ms-auto">
        <% if user_signed_in? %>
          <li class="nav-item">
            <%= link_to "ブックマーク", bookmarks_path, class: "nav-link" %>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown">
              <%= current_user.email %>
            </a>
            <ul class="dropdown-menu dropdown-menu-end">
              <li>
                <%= link_to "プロフィール編集", edit_user_registration_path, class: "dropdown-item" %>
              </li>
              <li><hr class="dropdown-divider"></li>
              <li>
                <%= button_to "ログアウト", destroy_user_session_path, method: :delete, class: "dropdown-item" %>
              </li>
            </ul>
          </li>
        <% else %>
          <li class="nav-item">
            <%= link_to "新規登録", new_user_registration_path, class: "nav-link" %>
          </li>
          <li class="nav-item">
            <%= link_to "ログイン", new_user_session_path, class: "nav-link" %>
          </li>
        <% end %>
      </ul>
    </div>
  </div>
</nav>
```

## 3. フラッシュメッセージの表示

```erb
# app/views/shared/_flash.html.erb
<% flash.each do |name, msg| %>
  <% if msg.is_a?(String) %>
    <div class="alert alert-<%= name == 'notice' ? 'success' : 'danger' %> alert-dismissible fade show">
      <%= msg %>
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    </div>
  <% end %>
<% end %>
```

## 4. レイアウトファイルの更新

```erb
# app/views/layouts/application.html.erb
<!DOCTYPE html>
<html>
  <head>
    <title>Bookmarkly</title>
    <%= csrf_meta_tags %>
    <%= csp_meta_tag %>

    <%= stylesheet_link_tag "application", media: "all", "data-turbo-track": "reload" %>
    <%= javascript_importmap_tags %>
  </head>

  <body>
    <%= render 'shared/header' %>
    
    <div class="container mt-4">
      <%= render 'shared/flash' %>
      <%= yield %>
    </div>
  </body>
</html>
```

## 5. ルーティングの確認

```ruby
# config/routes.rb
Rails.application.routes.draw do
  devise_for :users
  root 'bookmarks#index'
  
  resources :bookmarks
end
```