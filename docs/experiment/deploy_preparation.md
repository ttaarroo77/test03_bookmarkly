# Herokuデプロイ準備手順

## 1. 事前準備

### 1.1 Herokuアカウント作成
- Herokuの公式サイト（https://www.heroku.com）でアカウントを作成
- 必要に応じて二要素認証を設定

### 1.2 Heroku CLIのインストール
```bash
# macOSの場合
brew tap heroku/brew && brew install heroku

# バージョン確認
heroku --version
```

### 1.3 Herokuへのログイン
```bash
heroku login
```

## 2. アプリケーションの準備

### 2.1 Gemfileの修正
```ruby
group :production do
  # PostgreSQLを使用
  gem 'pg'
end

# Herokuで必要なGem
gem 'rails_12factor', group: :production
```

### 2.2 Procfileの作成
```
# Procfile
web: bundle exec puma -C config/puma.rb
```

### 2.3 database.ymlの設定
```yaml
production:
  url: <%= ENV['DATABASE_URL'] %>
  adapter: postgresql
  encoding: unicode
  pool: <%= ENV.fetch("RAILS_MAX_THREADS") { 5 } %>
```

## 3. Herokuアプリケーションの作成

### 3.1 新規アプリケーション作成
```bash
heroku create bookmarkly-app
```

### 3.2 環境変数の設定
```bash
heroku config:set RAILS_MASTER_KEY=$(cat config/master.key)
heroku config:set RAILS_ENV=production
```

### 3.3 アドオンの追加
```bash
# PostgreSQLの追加
heroku addons:create heroku-postgresql:hobby-dev
```

## 4. デプロイ設定

### 4.1 GitHubとの連携
1. Herokuダッシュボードで「Deploy」タブを選択
2. 「Deployment method」で「GitHub」を選択
3. リポジトリを連携

### 4.2 自動デプロイの設定
1. 「Enable Automatic Deploys」を選択
2. 必要に応じて「Wait for CI to pass before deploy」を有効化

## 5. 初回デプロイ

### 5.1 手動デプロイ
```bash
git push heroku main
```

### 5.2 データベースマイグレーション
```bash
heroku run rails db:migrate
```

### 5.3 動作確認
```bash
heroku open
```

## 6. CI/CD設定

### 6.1 GitHub Actionsの設定
```yaml
# .github/workflows/heroku.yml
name: Deploy to Heroku

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: akhileshns/heroku-deploy@v3.12.12
        with:
          heroku_api_key: ${{secrets.HEROKU_API_KEY}}
          heroku_app_name: "bookmarkly-app"
          heroku_email: ${{secrets.HEROKU_EMAIL}}
```

### 6.2 シークレットの設定
1. GitHubリポジトリの「Settings」→「Secrets」
2. 以下の値を設定：
   - `HEROKU_API_KEY`
   - `HEROKU_EMAIL`

## 7. 注意事項
- 本番環境の環境変数は適切に設定
- アセットのプリコンパイルを確認
- エラーログの確認方法を把握
- バックアップの設定を検討 