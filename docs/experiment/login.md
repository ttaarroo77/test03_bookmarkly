# ログイン画面の実装メモ

## 1. 実装目標
シンプルでモダンなログイン画面をBootstrapで実装する


- **ログイン画面**  
    - **概要**: 登録済みユーザーがメールアドレスとパスワードでログイン  
    - **参考画像**: `docs/images/login.png`  
    - **詳細**:
        - 入力フィールド（メールアドレス、パスワード）
        - 「ログイン」ボタン
        - 新規登録やパスワードリセットリンク


## 2. 純粋なHTML/CSSでの実装例

### 2.1 基本構造
```html
<div class="container d-flex flex-column align-items-center justify-content-center vh-100">
  <!-- タイトル -->
  <h1 class="mb-4">Bookmarkly</h1>
  
  <!-- ログインフォーム -->
  <div class="login-container">
    <h2 class="mb-4">ログイン</h2>
    <form>
      <!-- メールアドレス入力 -->
      <div class="mb-3">
        <label for="email" class="form-label">メールアドレス</label>
        <input type="email" class="form-control" id="email" placeholder="you@email.com" />
      </div>
      
      <!-- パスワード入力 -->
      <div class="mb-3">
        <label for="password" class="form-label">パスワード</label>
        <input type="password" class="form-control" id="password" placeholder="********" />
      </div>
      
      <!-- ログインボタン -->
      <button type="submit" class="btn btn-dark w-100">ログイン</button>
    </form>

    <!-- リンク -->
    <div class="d-flex justify-content-between mt-3">
      <a href="#">新規登録</a>
      <a href="#">パスワードを忘れた場合</a>
    </div>
  </div>
</div>
```

### 2.2 必要なスタイル
```css
body {
  background-color: #f8f9fa;
}
.login-container {
  max-width: 400px;
  width: 100%;
}
```

## 3. Railsでの実装方法

### 3.1 Bootstrapの導入
```ruby
# Gemfile
gem 'bootstrap', '~> 5.3'
```

### 3.2 ログイン画面のView
```erb
<%# app/views/devise/sessions/new.html.erb %>
<div class="container d-flex flex-column align-items-center justify-content-center vh-100">
  <h1 class="mb-4">Bookmarkly</h1>

  <div class="login-container">
    <h2 class="mb-4">ログイン</h2>
    
    <%= form_for(resource, as: resource_name, url: session_path(resource_name)) do |f| %>
      <div class="mb-3">
        <%= f.label :email, "メールアドレス", class: "form-label" %>
        <%= f.email_field :email, class: "form-control", placeholder: "you@email.com" %>
      </div>

      <div class="mb-3">
        <%= f.label :password, "パスワード", class: "form-label" %>
        <%= f.password_field :password, class: "form-control" %>
      </div>

      <%= f.submit "ログイン", class: "btn btn-dark w-100" %>
    <% end %>

    <div class="d-flex justify-content-between mt-3">
      <%= link_to "新規登録", new_registration_path(resource_name), class: "text-decoration-none" %>
      <%= link_to "パスワードを忘れた場合", new_password_path(resource_name), class: "text-decoration-none" %>
    </div>
  </div>
</div>
```

## 4. デザインのポイント

1. **中央寄せ**
   - `d-flex`, `align-items-center`, `justify-content-center` で完全中央配置
   - `vh-100` で画面の高さいっぱいに

2. **フォームの幅**
   - `max-width: 400px` でフォームが広がりすぎないように制御

3. **余白の調整**
   - `mb-4`, `mt-3` などのユーティリティクラスで適切な余白を確保

4. **ボタンのスタイル**
   - `btn-dark` でダークテーマ
   - `w-100` で横幅いっぱい

5. **リンクの配置**
   - `justify-content-between` で両端に配置