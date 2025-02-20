# パスワードリセット画面の実装メモ

## 1. 実装目標
シンプルでモダンなパスワードリセット画面をBootstrapで実装する

- **パスワードリセット画面**  
    - **概要**: パスワードを忘れたユーザーがリセットメールを要求する画面
    - **参考画像**: `docs/images/password_reset.png`  
    - **詳細**:
        - メールアドレス入力フィールド
        - 「パスワードリセットメールを送信」ボタン
        - ログイン画面へ戻るリンク

## 2. 純粋なHTML/CSSでの実装例

### 2.1 基本構造
```html
<div class="d-flex align-items-center justify-content-center min-vh-100">
  <div class="card shadow-sm" style="width: 24rem;">
    <div class="card-body p-4">
      <h1 class="text-center h3 mb-4">Bookmarkly</h1>
      <h2 class="text-center h4 mb-4">パスワードをお忘れの方</h2>

      <form>
        <div class="mb-4">
          <label for="email" class="form-label">メールアドレス</label>
          <input 
            type="email" 
            class="form-control" 
            id="email" 
            placeholder="your@email.com" />
        </div>

        <button type="submit" class="btn btn-dark w-100 mb-3">
          パスワードリセットメールを送信
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

### 3.2 パスワードリセット画面のView
```erb
<%# app/views/devise/passwords/new.html.erb %>
<div class="d-flex align-items-center justify-content-center min-vh-100">
  <div class="card shadow-sm" style="width: 24rem;">
    <div class="card-body p-4">
      <h1 class="text-center h3 mb-4">Bookmarkly</h1>
      <h2 class="text-center h4 mb-4">パスワードをお忘れの方</h2>

      <%= form_for(resource, as: resource_name, url: password_path(resource_name), html: { method: :post }) do |f| %>
        <%= render "devise/shared/error_messages", resource: resource %>

        <div class="mb-4">
          <%= f.label :email, "メールアドレス", class: "form-label" %>
          <%= f.email_field :email, 
              class: "form-control", 
              placeholder: "your@email.com",
              autocomplete: "email" %>
        </div>

        <%= f.submit "パスワードリセットメールを送信", 
            class: "btn btn-dark w-100 mb-3" %>

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
   - `mb-4` でフォーム要素間の余白を調整

3. **フォームレイアウト**
   - `form-label`, `form-control` でBootstrapのフォームスタイルを適用
   - プレースホルダーでヒントを表示

4. **ボタン**
   - `btn-dark w-100` でダークテーマの横幅いっぱいのボタン
   - `mb-3` でボタン下の余白を確保

5. **リンク**
   - `text-center small` で中央寄せの小さめテキスト
   - `text-decoration-none` で下線を削除 