# ブックマーク管理画面の実装メモ

## 1. 実装目標
シンプルでモダンなブックマーク管理画面をBootstrapで実装する

- **ブックマーク管理画面**  
    - **概要**: ブックマークの一覧表示・追加・編集・削除・検索ができる画面
    - **参考画像**: `docs/images/bookmark_management.png`  
    - **詳細**:
        - ブックマーク一覧（タイトル、URL、タグ）
        - 新規ブックマーク追加フォーム
        - タグ検索フォーム

## 2. 純粋なHTML/CSSでの実装例

### 2.1 基本構造
```html
<div class="container py-5">
  <h1 class="mb-4">ブックマーク管理</h1>

  <div class="row">
    <!-- 左カラム: ブックマーク一覧 -->
    <div class="col-md-8 mb-4">
      <div class="card mb-3">
        <div class="card-body d-flex justify-content-between align-items-center">
          <div>
            <h5 class="card-title mb-1">Google</h5>
            <a href="https://www.google.com" 
               class="card-link" 
               target="_blank" 
               rel="noopener noreferrer">
              https://www.google.com
            </a>
          </div>
          <div>
            <span class="badge bg-secondary me-2">検索</span>
            <button class="btn btn-sm btn-outline-primary me-2">編集</button>
            <button class="btn btn-sm btn-outline-danger">削除</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 右カラム: 新規ブックマーク & タグ検索 -->
    <div class="col-md-4">
      <!-- 新規ブックマーク -->
      <div class="card mb-4">
        <div class="card-body">
          <h5 class="card-title">新規ブックマーク</h5>
          <form>
            <div class="mb-3">
              <label for="bookmarkUrl" class="form-label">URL</label>
              <input 
                type="url" 
                class="form-control" 
                id="bookmarkUrl"
                placeholder="https://example.com" />
            </div>
            <div class="mb-3">
              <label for="bookmarkTitle" class="form-label">タイトル</label>
              <input 
                type="text" 
                class="form-control" 
                id="bookmarkTitle"
                placeholder="ウェブサイトのタイトル" />
            </div>
            <div class="mb-3">
              <label for="bookmarkTags" class="form-label">タグ</label>
              <input 
                type="text" 
                class="form-control" 
                id="bookmarkTags"
                placeholder="カンマ区切りでタグを入力" />
            </div>
            <button type="submit" class="btn btn-dark w-100">追加</button>
          </form>
        </div>
      </div>

      <!-- タグ検索 -->
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">タグ検索</h5>
          <form>
            <div class="mb-3">
              <label for="searchKeyword" class="form-label">キーワード</label>
              <input 
                type="text" 
                class="form-control" 
                id="searchKeyword"
                placeholder="タグまたはタイトルで検索" />
            </div>
            <button type="submit" class="btn btn-dark w-100">検索</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>
```

### 2.2 必要なスタイル
```css
body {
  background-color: #f8f9fa;
}

.card {
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.bookmark-title {
  color: #212529;
  text-decoration: none;
}

.bookmark-url {
  color: #6c757d;
  font-size: 0.875rem;
}
```

## 3. Railsでの実装方法

### 3.1 ブックマーク一覧のパーシャル
```erb
<%# app/views/bookmarks/_bookmark.html.erb %>
<div class="card mb-3">
  <div class="card-body d-flex justify-content-between align-items-center">
    <div>
      <h5 class="card-title mb-1"><%= bookmark.title %></h5>
      <%= link_to bookmark.url, bookmark.url, 
          class: "card-link",
          target: "_blank",
          rel: "noopener noreferrer" %>
    </div>
    <div>
      <% bookmark.tags.each do |tag| %>
        <span class="badge bg-secondary me-2"><%= tag %></span>
      <% end %>
      <%= link_to edit_bookmark_path(bookmark), 
          class: "btn btn-sm btn-outline-primary me-2" do %>
        <i class="bi bi-pencil"></i>
      <% end %>
      <%= button_to bookmark_path(bookmark),
          method: :delete,
          class: "btn btn-sm btn-outline-danger",
          form: { data: { turbo_confirm: "本当に削除しますか？" } } do %>
        <i class="bi bi-trash"></i>
      <% end %>
    </div>
  </div>
</div>
```

### 3.2 新規ブックマークフォーム
```erb
<%# app/views/bookmarks/_form.html.erb %>
<div class="card mb-4">
  <div class="card-body">
    <h5 class="card-title">新規ブックマーク</h5>
    <%= form_with(model: @bookmark) do |f| %>
      <div class="mb-3">
        <%= f.label :url, "URL", class: "form-label" %>
        <%= f.url_field :url, 
            class: "form-control",
            placeholder: "https://example.com" %>
      </div>
      <div class="mb-3">
        <%= f.label :title, "タイトル", class: "form-label" %>
        <%= f.text_field :title, 
            class: "form-control",
            placeholder: "ウェブサイトのタイトル" %>
      </div>
      <div class="mb-3">
        <%= f.label :tag_list, "タグ", class: "form-label" %>
        <%= f.text_field :tag_list, 
            class: "form-control",
            placeholder: "カンマ区切りでタグを入力" %>
      </div>
      <%= f.submit "追加", class: "btn btn-dark w-100" %>
    <% end %>
  </div>
</div>
```

### 3.3 タグ検索フォーム
```erb
<%# app/views/bookmarks/_search_form.html.erb %>
<div class="card">
  <div class="card-body">
    <h5 class="card-title">タグ検索</h5>
    <%= form_with(url: search_bookmarks_path, method: :get) do |f| %>
      <div class="mb-3">
        <%= f.label :q, "キーワード", class: "form-label" %>
        <%= f.text_field :q, 
            class: "form-control",
            placeholder: "タグまたはタイトルで検索" %>
      </div>
      <%= f.submit "検索", class: "btn btn-dark w-100" %>
    <% end %>
  </div>
</div>
```

## 4. デザインのポイント

1. **2カラムレイアウト**
   - `col-md-8` と `col-md-4` で左右に分割
   - レスポンシブ対応（モバイルでは縦並び）

2. **カード形式**
   - `card` と `shadow-sm` でカード風の見た目に
   - 各要素を視覚的に区切り、情報を整理

3. **フレックスボックス**
   - `d-flex justify-content-between` でタイトルとボタンを両端に配置
   - `align-items-center` で垂直方向の中央揃え

4. **ボタン**
   - `btn-sm` で小さめのボタンサイズ
   - アイコンを使用して視認性向上（Bootstrap Icons）

5. **タグ**
   - `badge bg-secondary` でバッジスタイル
   - `me-2` でタグ間の余白を確保

6. **フォーム**
   - プレースホルダーでヒントを表示
   - 適切な入力タイプ（url, text）を指定