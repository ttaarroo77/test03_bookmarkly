# Bookmarkly プロジェクト 手順書

## 1. プロジェクトセットアップ

### 1.1. Rails環境の準備
- [ ] Rubyをインストール（バージョンを確認し、必要に応じてインストール）。
- [ ] Railsをインストール (`gem install rails`)。
- [ ] RubyGemsのアップデート (`gem update --system`)。
- [ ] Node.js と Yarn をインストール（JavaScriptの依存管理のため）。
- [ ] PostgreSQLのインストール（本番環境用）。
- [ ] Bundlerのインストール (`gem install bundler`)。

### 1.2. 新規Railsプロジェクトの作成
- [ ] Railsアプリケーションの作成 (`rails new bookmarkly --database=postgresql`)。
- [ ] プロジェクトフォルダに移動 (`cd bookmarkly`)。
- [ ] GitHubリポジトリを作成して、Gitで初期化 (`git init`)。
- [ ] `.gitignore`ファイルを設定（`.env`, `tmp`, `log`など）。

### 1.3. 必要なGemのインストール
- [ ] `Gemfile`に追加（`devise`, `rspec-rails`, `pg`, `bootstrap`など）。
- [ ] `bundle install`でGemをインストール。
- [ ] データベース設定を確認（`config/database.yml`）。
- [ ] PostgreSQLの設定を確認（`rails db:create`）。

## 2. ユーザー認証の実装

### 2.1. Deviseのインストール
- [ ] `Gemfile`に`devise`を追加。
- [ ] `bundle install`を実行。
- [ ] `rails generate devise:install`を実行。
- [ ] Deviseの設定ファイルを確認（`config/initializers/devise.rb`）。
- [ ] `rails generate devise User`を実行（ユーザーの作成）。
- [ ] マイグレーションを実行 (`rails db:migrate`)。

### 2.2. ログイン・ログアウト機能の作成
- [ ] `sessions_controller.rb`を作成し、ログイン・ログアウト処理を実装。
- [ ] `views/sessions/new.html.erb`を作成してログインフォームを作成。
- [ ] `config/routes.rb`にルートを設定 (`resources :sessions`など)。
- [ ] ログイン機能のテスト。

### 2.3. ユーザー登録・変更機能の作成
- [ ] `users_controller.rb`を作成してユーザー登録・プロフィール編集機能を作成。
- [ ] `views/users/new.html.erb`を作成してユーザー登録フォームを作成。
- [ ] `views/users/edit.html.erb`を作成してプロフィール変更フォームを作成。
- [ ] `config/routes.rb`にユーザー関連のルートを設定。

## 3. ブックマーク機能の実装

### 3.1. ブックマークモデルの作成
- [ ] `rails generate model Bookmark title:string url:string description:text user:references` を実行。
- [ ] `rails db:migrate`を実行してデータベースを更新。
- [ ] `Bookmark`モデルにバリデーションを追加（`validates :title, :url, :description, presence: true`）。

### 3.2. ブックマークコントローラーの作成
- [ ] `rails generate controller Bookmarks` を実行。
- [ ] `BookmarksController`にCRUDアクションを実装（`index`, `show`, `new`, `create`, `edit`, `update`, `destroy`）。
- [ ] `views/bookmarks`ディレクトリに対応するビューを作成。

### 3.3. ブックマーク一覧・詳細表示
- [ ] `bookmarks/index.html.erb`を作成してブックマークの一覧を表示。
- [ ] `bookmarks/show.html.erb`を作成してブックマーク詳細ページを作成。
- [ ] `bookmarks/new.html.erb`を作成して新しいブックマークを追加するフォームを作成。

### 3.4. ルーティングの設定
- [ ] `config/routes.rb`にルートを追加 (`resources :bookmarks`など)。

## 4. タグ機能の実装

### 4.1. タグモデルの作成
- [ ] `rails generate model Tag name:string` を実行。
- [ ] `rails db:migrate`を実行してデータベースに反映。

### 4.2. タグとブックマークの多対多関係の設定
- [ ] 中間テーブル`bookmarks_tags`を作成（`rails generate migration create_bookmarks_tags bookmark:references tag:references`）。
- [ ] `Bookmark`と`Tag`モデルに`has_and_belongs_to_many`を設定。

### 4.3. タグ入力フォームの作成
- [ ] `bookmarks/new.html.erb`フォームにタグ入力欄を追加。
- [ ] タグを保存するロジックを`BookmarksController`に追加。

## 5. 検索機能の実装

### 5.1. 検索フォームの作成
- [ ] `bookmarks/index.html.erb`に検索フォームを追加（`form_with`でタイトル、タグ検索）。

### 5.2. 検索ロジックの実装
- [ ] `BookmarksController`に検索ロジックを追加（`params[:search]`を使ってブックマークを絞り込む）。

### 5.3. 検索結果の表示
- [ ] 検索結果を`bookmarks/index.html.erb`に表示。
- [ ] 結果がない場合のメッセージを表示。

## 6. マイページ機能の実装

### 6.1. マイページコントローラーの作成
- [ ] `rails generate controller Users show edit update` を実行。
- [ ] `UsersController`に`show`, `edit`, `update`アクションを追加。

### 6.2. プロフィール編集機能
- [ ] `users/edit.html.erb`でプロフィール編集フォームを作成。
- [ ] `UsersController`にプロフィール更新ロジックを追加。

### 6.3. マイページビューの作成
- [ ] `users/show.html.erb`を作成してユーザーの詳細情報を表示。

## 7. フロントエンドのセットアップ

### 7.1. HTML/CSS/JSでの見た目再現
- [ ] `index.html`を作成し、Next.jsのレイアウトを再現。
- [ ] `styles.css`を作成し、Next.jsのスタイルを再現。
- [ ] `app.js`を作成し、Rails APIと通信するロジックを追加。

### 7.2. Rails APIとの連携
- [ ] `BookmarksController`をAPIモードで作成（`render json:`を使用）。
- [ ] `app.js`で`fetch`を使用してAPIと通信し、データを取得・表示。

### 7.3. フロントエンドのデプロイ
- [ ] フロントエンドを静的ファイルとしてデプロイ（Netlify、Vercelなど）。

## 8. デプロイ

### 8.1. Herokuアカウントの作成
- [ ] Herokuアカウントを作成。
- [ ] Heroku CLIをインストール。

### 8.2. GitHubリポジトリの作成
- [ ] GitHubリポジトリを作成し、プロジェクトをプッシュ。

### 8.3. Herokuへのデプロイ
- [ ] Herokuにアプリケーションをデプロイ。
- [ ] データベースを設定し、マイグレーションを実行 (`heroku run rake db:migrate`).

---

このMarkdownファイルをGitHubやMarkdown対応のエディタで使うと、各タスクを完了した際にチェックを入れられるので、進捗管理が容易になります。

