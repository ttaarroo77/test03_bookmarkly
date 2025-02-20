# Bookmarkly プロジェクト 手順書

この手順書は、Bookmarks アプリのバックエンド（Rails）およびフロントエンド（Rails の View で fe_v0 を参考）実装に必要な全体工程を、チェックリスト形式でまとめたものです。

---

## 1. 開発環境の準備と Git 初期設定

### 1.1. 開発環境のセットアップ
- [ ] Ruby, Rails, Node.js, Yarn, PostgreSQL, Bundler を各自インストールする
- [ ] `rails new bookmarkly --database=postgresql` で新規 Rails プロジェクトを作成する
- [ ] プロジェクトフォルダに移動 (`cd bookmarkly`)
- [ ] 必要な Gem（`devise`, `rspec-rails`, `pg`, `bootstrap` など）を `Gemfile` に追加する
- [ ] `bundle install` を実行する
- [ ] データベース設定を確認し、`rails db:create` でデータベースを作成する

### 1.2. Git リポジトリの初期化
- [ ] プロジェクトルートで `git init` を実行する
- [ ] `.gitignore` ファイル（Ruby、Rails、fe_v0 など Next.js 関連の除外設定を含む）を整備する
- [ ] 初回の変更をステージングし、`git add .` で全ファイルを追加する
- [ ] `git commit -m "Initial commit: 環境セットアップおよび Rails プロジェクト作成"` を実行する
- [ ] GitHub リポジトリを作成し、`git remote add origin [リポジトリのURL]` でリモートリポジトリを追加する
- [ ] `git push -u origin main`（または master） を実行し初回プッシュする
- [ ] 必要に応じて、feature ブランチを作成する  
  `git branch feature/xxxx` → `git checkout feature/xxxx`

---

## 2. バックエンドの実装 (Rails)

### 2.1. ユーザー認証 (Devise) の実装
- [ ] `Gemfile` に `devise` を追加する
- [ ] `bundle install` を実行する
- [ ] `rails generate devise:install` を実行する
- [ ] `config/initializers/devise.rb` の設定を確認・必要に応じて修正する
- [ ] `rails generate devise User` を実行し、ユーザーモデルを作成する
- [ ] `rails db:migrate` を実行する

### 2.2. ログイン・ログアウト機能の作成
- [ ] `sessions_controller.rb` を作成し、ログイン・ログアウト処理を実装する
- [ ] `views/sessions/new.html.erb` を作成してログインフォームを実装する
- [ ] `config/routes.rb` に `resources :sessions` などのルーティングを追加する
- [ ] ログイン機能のテストを実施する

### 2.3. ユーザー登録・プロフィール編集機能の作成
- [ ] `users_controller.rb` を作成する
- [ ] `views/users/new.html.erb`（ユーザー登録）、`views/users/edit.html.erb`（プロフィール編集）を作成する
- [ ] `config/routes.rb` にユーザー関連のルート（例：`resources :users` など）を追加する

### 2.4. ブックマーク管理機能の実装
- [x] `rails generate model Bookmark title:string url:string description:text user:references` を実行する
- [x] `rails db:migrate` を実行する
- [x] `Bookmark` モデルに、`validates :title, :url, :description, presence: true` などのバリデーションを追加する
- [x] `rails generate controller Bookmarks` を実行する
- [x] `BookmarksController` に CRUD (index, show, new, create, edit, update, destroy) アクションを実装する
- [x] `views/bookmarks/` ディレクトリに、`index.html.erb`, `show.html.erb`, `new.html.erb`, `edit.html.erb` を作成する
- [x] `config/routes.rb` に `resources :bookmarks` を追加する
- [ ] curlコマンドでAPIの動作確認を実施する
  ```bash
  # 認証
  curl -X POST http://localhost:3000/users/sign_in \
    -H "Content-Type: application/json" \
    -d '{"user": {"email": "test@example.com", "password": "password123"}}'
  
  # CRUD操作の確認
  # 結果は docs/overview_0/api_test_commands.md に記録

  ```

### 2.5. タグ機能の実装
- [x] `rails generate model Tag name:string` を実行する
- [x] `rails db:migrate` を実行する
- [x] `rails generate migration create_bookmarks_tags bookmark:references tag:references` を実行する
- [x] `Bookmark` と `Tag` モデルに `has_and_belongs_to_many` の関連付けを設定する
- [x] `views/bookmarks/new.html.erb` にタグ入力欄を追加し、タグ保存ロジックを `BookmarksController` に実装する

### 2.6. 検索機能の実装
- [x] `views/bookmarks/index.html.erb` に、`form_with` を使った検索フォームを追加する
- [x] `BookmarksController` に、`params[:search]` を用いた検索ロジックを追加する
- [x] 検索結果の表示エリアおよび「結果がない場合」のメッセージを実装する

### 2.7. マイページ機能の実装
- [ ] `users_controller.rb` を作成する
- [ ] `views/users/show.html.erb`（マイページ）を作成する
- [ ] `config/routes.rb` にマイページのルートを追加する

---

## 3. フロントエンドの作成 (Rails の View で fe_v0 を参考)

### 3.1. fe_v0 の解析
- [ ] `fe_v0` ディレクトリ内のファイル（例：`src/app`, `components`, `tailwind.config.ts` など）を精査する
- [ ] Next.js のコンポーネント／レイアウト（例：`layout.tsx`）を参考にし、再現すべきUI要素を特定する

### 3.2. Rails での共通レイアウト作成
- [ ] `app/views/layouts/application.html.erb` を編集し、共通ヘッダー、フッター、ナビゲーションバーを実装する
- [ ] fe_v0 のデザイン（色、フォント、レイアウト）を踏襲し、必要に応じて Bootstrap やカスタム CSS を適用する

### 3.3. 各ページのビュー実装
- [x] `app/views/bookmarks/index.html.erb` （一覧画面）を作成する
- [x] `app/views/bookmarks/show.html.erb` （詳細画面）を作成する
- [x] `app/views/bookmarks/new.html.erb` （新規作成フォーム）を作成する
- [x] `app/views/bookmarks/edit.html.erb` （編集フォーム）を作成する
- [ ] 全体の微調整をする。


### 3.4. スタイルと動的機能の実装
- [ ] `app/assets/stylesheets` にカスタム CSS ファイルを作成、fe_v0 のスタイルや Bootstrap のクラスを活用してデザインを適用する
- [ ] `app/javascript` に必要な JavaScript ファイルを作成し、検索機能やタグ入力の動的処理を実装する（必要に応じて Stimulus.js の導入も検討する）

### 3.5. API 連携 (必要な場合)
- [ ] `BookmarksController` に API 用のエンドポイント（`render json:` を利用）を実装する
- [ ] `app/javascript` 内のファイルで `fetch` API を利用し、JSON データを取得・表示する

---

## 4. デプロイおよび運用

### 4.1. Heroku へのデプロイ準備
- [ ] Heroku アカウントを作成する
- [ ] Heroku CLI をインストールする
- [ ] Procfile や必要な環境変数の設定を確認・整備する
- [ ] GitHub リポジトリとの連携を設定する
- [ ] Heroku に初回デプロイし、`heroku run rake db:migrate` 等でデータベースマイグレーションを実行する

### 4.2. CI/CD およびテストの整備
- [ ] RSpec を導入し、テストケースを作成する
- [ ] RuboCop などによるコード品質チェックを設定する
- [ ] GitHub Actions 等の CI/CD パイプラインを構築する

---

## 5. ドキュメントの更新と運用ルールの確立

- [ ] `procedure.md`, `product-brief.md`, `git_record.md` などのドキュメントを最新の進捗に合わせて更新する
- [ ] Git のコミットメッセージルール、ブランチ戦略、プルリクエストによるレビュー体制などを確立する

---

## 次に進むべき具体的なアクション

- [ ] 環境セットアップおよび Git 初期作業を実施する
- [ ] Rails プロジェクトの基本骨格（バックエンド機能）を実装開始する
- [ ] fe_v0 の詳細な解析を行い、再現すべき UI/UX 要素を洗い出す
- [ ] Rails の共通レイアウト・ビューの作成と、スタイル・JavaScript の実装を行う
- [ ] Heroku へのデプロイ準備と CI/CD パイプラインの整備を進める

---

この手順書に沿って、各工程をチェックリスト形式で進捗管理しながら開発を進めてください。

