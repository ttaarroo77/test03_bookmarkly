# 新規登録画面の実装メモ

## 1. 実装目標
シンプルでモダンな新規登録画面をBootstrapで実装する

- **新規登録画面**  
    - **概要**: 新規ユーザーがアカウントを作成する画面
    - **参考画像**: `docs/images/signup.png`  
    - **詳細**:
        - 入力フィールド（メールアドレス、パスワード、パスワード確認）
        - 「アカウント作成」ボタン
        - ログイン画面へのリンク

## 2. 純粋なHTML/CSSでの実装例

### 2.1 基本構造
```html
<div class="d-flex align-items-center justify-content-center min-vh-100">
  <div class="card shadow-sm" style="width: 24rem;">
    <div class="card-body p-4">
      <h1 class="text-center h3 mb-4">Bookmarkly</h1>
      <h2 class="text-center h4 mb-4">新規登録</h2>

      <form>
        <!-- ここにメールアドレスの入力フィールドを実装するべき -->

        <div class="mb-3">
          <label for="email" class="form-label">メールアドレス</label>
          <input 
            type="email" 
            class="form-control" 
            id="email" 
            placeholder="your@email.com" />
        </div>

        <div class="mb-3">
          <label for="password" class="form-label">パスワード</label>
          <input 
            type="password" 
            class="form-control" 
            id="password" />
        </div>

        <div class="mb-4">
          <label for="password_confirmation" class="form-label">パスワード（確認）</label>
          <input 
            type="password" 
            class="form-control" 
            id="password_confirmation" />
        </div>

        <button type="submit" class="btn btn-dark w-100 mb-3">
          アカウント作成
        </button>

        <div class="text-center small">
          <a href="#" class="text-decoration-none">ログインはこちら</a>
        </div>
      </form>
    </div>
  </div>
</div>
```

### 2.2 必要なスタイル
```css
body {
  background-color: #f8f9fa;
}
```

## 3. Railsでの実装方法

### 3.1 Bootstrapの導入
```ruby
# Gemfile
gem 'bootstrap', '~> 5.3'
```

### 3.2 新規登録画面のView
```erb
<%# app/views/devise/registrations/new.html.erb %>
<div class="d-flex align-items-center justify-content-center min-vh-100">
  <div class="card shadow-sm" style="width: 24rem;">
    <div class="card-body p-4">
      <h1 class="text-center h3 mb-4">Bookmarkly</h1>
      <h2 class="text-center h4 mb-4">新規登録</h2>

      <%= form_for(resource, as: resource_name, url: registration_path(resource_name)) do |f| %>
        <%= render "devise/shared/error_messages", resource: resource %>
        <!-- ここにメールアドレスの入力フィールドを実装するべきじゃない？ -->

        <div class="mb-3">
          <%= f.label :email, "メールアドレス", class: "form-label" %>
          <%= f.email_field :email, 
              class: "form-control", 
              placeholder: "your@email.com",
              autocomplete: "email" %>
        </div>

        <div class="mb-3">
          <%= f.label :password, "パスワード", class: "form-label" %>
          <%= f.password_field :password, 
              class: "form-control",
              autocomplete: "new-password" %>
        </div>

        <div class="mb-4">
          <%= f.label :password_confirmation, "パスワード（確認）", class: "form-label" %>
          <%= f.password_field :password_confirmation, 
              class: "form-control",
              autocomplete: "new-password" %>
        </div>

        <%= f.submit "アカウント作成", class: "btn btn-dark w-100 mb-3" %>

        <div class="text-center small">
          <%= link_to "ログインはこちら", 
              new_session_path(resource_name), 
              class: "text-decoration-none" %>
        </div>
      <% end %>
    </div>
  </div>
</div>
```

## 4. デザインのポイント

1. **カード形式**
   - `card` と `shadow-sm` でカード風の見た目に
   - `width: 24rem` で適度な幅を確保

2. **余白の調整**
   - `p-4` でカード内の余白を設定
   - `mb-3`, `mb-4` で要素間の余白を調整

3. **フォームレイアウト**
   - `form-label`, `form-control` でBootstrapのフォームスタイルを適用
   - プレースホルダーでヒントを表示

4. **ボタン**
   - `btn-dark w-100` でダークテーマの横幅いっぱいのボタン
   - `mb-3` でボタン下の余白を確保

5. **リンク**
   - `text-center small` で中央寄せの小さめテキスト
   - `text-decoration-none` で下線を削除 