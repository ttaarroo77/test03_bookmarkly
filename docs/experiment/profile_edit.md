# プロフィール編集画面の実装メモ

## 1. 実装目標
シンプルでモダンなプロフィール編集画面をBootstrapで実装する

- **プロフィール編集画面**  
    - **概要**: ユーザーが自身の情報を編集できる画面
    - **参考画像**: `docs/images/profile_edit.png`  
    - **詳細**:
        - 入力フィールド（名前、メールアドレス、パスワード）
        - 「更新」ボタン
        - エラーメッセージ表示領域

## 2. 純粋なHTML/CSSでの実装例

### 2.1 基本構造
```html
<div class="d-flex align-items-center justify-content-center min-vh-100">
  <div class="card shadow-sm" style="width: 24rem;">
    <div class="card-body p-4">
      <h1 class="text-center h3 mb-4">プロフィール編集</h1>

      <form>
        <!-- 名前入力 -->
        <div class="mb-3">
          <label for="name" class="form-label">名前</label>
          <input type="text" class="form-control" id="name" placeholder="あなたの名前" />
        </div>

        <!-- メールアドレス入力 -->
        <div class="mb-3">
          <label for="email" class="form-label">メールアドレス</label>
          <input type="email" class="form-control" id="email" placeholder="your@email.com" />
        </div>

        <!-- 新しいパスワード -->
        <div class="mb-3">
          <label for="password" class="form-label">新しいパスワード（変更する場合のみ）</label>
          <input type="password" class="form-control" id="password" />
        </div>

        <!-- パスワード確認 -->
        <div class="mb-3">
          <label for="password_confirmation" class="form-label">パスワード確認</label>
          <input type="password" class="form-control" id="password_confirmation" />
        </div>

        <!-- 現在のパスワード -->
        <div class="mb-4">
          <label for="current_password" class="form-label">現在のパスワード</label>
          <input type="password" class="form-control" id="current_password" />
          <div class="form-text">変更を保存するには現在のパスワードが必要です</div>
        </div>

        <button type="submit" class="btn btn-dark w-100">更新</button>
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

### 3.2 プロフィール編集画面のView
```erb
<%# app/views/devise/registrations/edit.html.erb %>
<div class="d-flex align-items-center justify-content-center min-vh-100">
  <div class="card shadow-sm" style="width: 24rem;">
    <div class="card-body p-4">
      <h1 class="text-center h3 mb-4">プロフィール編集</h1>

      <%= form_for(resource, as: resource_name, url: registration_path(resource_name), html: { method: :put }) do |f| %>
        <%= render "devise/shared/error_messages", resource: resource %>

        <div class="mb-3">
          <%= f.label :name, "名前", class: "form-label" %>
          <%= f.text_field :name, class: "form-control" %>
        </div>

        <div class="mb-3">
          <%= f.label :email, "メールアドレス", class: "form-label" %>
          <%= f.email_field :email, class: "form-control", autocomplete: "email" %>
        </div>

        <div class="mb-3">
          <%= f.label :password, "新しいパスワード（変更する場合のみ）", class: "form-label" %>
          <%= f.password_field :password, class: "form-control", autocomplete: "new-password" %>
        </div>

        <div class="mb-3">
          <%= f.label :password_confirmation, "パスワード確認", class: "form-label" %>
          <%= f.password_field :password_confirmation, class: "form-control", autocomplete: "new-password" %>
        </div>

        <div class="mb-4">
          <%= f.label :current_password, "現在のパスワード", class: "form-label" %>
          <%= f.password_field :current_password, class: "form-control", autocomplete: "current-password" %>
          <div class="form-text">変更を保存するには現在のパスワードが必要です</div>
        </div>

        <%= f.submit "更新", class: "btn btn-dark w-100" %>
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
   - `form-text` で補足説明を追加

4. **ボタン**
   - `btn-dark w-100` でダークテーマの横幅いっぱいのボタン

5. **エラーメッセージ**
   - Deviseの `error_messages` パーシャルを使用 