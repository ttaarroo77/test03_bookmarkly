# API テストコマンド集

## 認証関連

```bash
# ログインのテスト
curl -X POST http://localhost:3000/users/sign_in \
  -H "Content-Type: application/json" \
  -d '{"user": {"email": "test@example.com", "password": "password123"}}'

# ログアウトのテスト
curl -X DELETE http://localhost:3000/users/sign_out \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## ブックマーク関連

```bash
# ブックマーク一覧の取得
curl http://localhost:3000/bookmarks \
  -H "Authorization: Bearer YOUR_TOKEN"

# ブックマークの作成
curl -X POST http://localhost:3000/bookmarks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "bookmark": {
      "title": "Example Bookmark",
      "url": "https://example.com",
      "description": "This is a test bookmark"
    }
  }'

# ブックマークの更新
curl -X PATCH http://localhost:3000/bookmarks/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "bookmark": {
      "title": "Updated Title"
    }
  }'

# ブックマークの削除
curl -X DELETE http://localhost:3000/bookmarks/1 \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## CSRF保護を考慮したテスト

```bash
# CSRFトークンの取得とcookieの保存
csrf_token=$(curl -c cookies.txt -b cookies.txt http://localhost:3000 | grep csrf-token | awk -F'"' '{print $2}')

# ブックマーク作成（CSRF保護あり）
curl -X POST http://localhost:3000/bookmarks \
  -H "X-CSRF-Token: $csrf_token" \
  -b cookies.txt \
  -d "bookmark[title]=Test Bookmark" \
  -d "bookmark[url]=https://example.com"
```

## 開発用ヘルパーコマンド

```bash
# サーバーの状態確認
curl http://localhost:3000/up

# アプリケーションの環境確認
curl http://localhost:3000/rails/info/properties

# ルーティング情報の確認（要認証）
curl http://localhost:3000/rails/info/routes \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## 注意事項

1. これらのコマンドは開発環境（localhost:3000）用です
2. `YOUR_TOKEN` は実際の認証トークンに置き換えてください
3. IDやトークンは環境に応じて適切な値に変更してください
4. 本番環境でのテストは十分な注意を払って実行してください

## 使用例

```bash
# 1. ログインしてトークンを取得
token=$(curl -X POST http://localhost:3000/users/sign_in \
  -H "Content-Type: application/json" \
  -d '{"user": {"email": "test@example.com", "password": "password123"}}' \
  | jq -r '.token')

# 2. 取得したトークンを使ってブックマークを作成
curl -X POST http://localhost:3000/bookmarks \
  -H "Authorization: Bearer $token" \
  -H "Content-Type: application/json" \
  -d '{"bookmark": {"title": "Test", "url": "https://example.com"}}'
```

# API動作確認テスト

## 1. ユーザー認証テスト

```bash
# ユーザー登録
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{
    "user": {
      "email": "test@example.com",
      "password": "password123",
      "password_confirmation": "password123"
    }
  }'

# ログイン（認証トークン取得）
curl -X POST http://localhost:3000/users/sign_in \
  -H "Content-Type: application/json" \
  -d '{
    "user": {
      "email": "test@example.com",
      "password": "password123"
    }
  }'
```

## 2. ブックマークCRUDテスト

```bash
# 認証トークンを環境変数に設定（上記ログインレスポンスから取得）
export AUTH_TOKEN="取得したトークン"

# ブックマーク作成
curl -X POST http://localhost:3000/bookmarks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $AUTH_TOKEN" \
  -d '{
    "bookmark": {
      "title": "テストブックマーク",
      "url": "https://example.com",
      "description": "テスト用の説明文です"
    }
  }'

# ブックマーク一覧取得
curl -X GET http://localhost:3000/bookmarks \
  -H "Authorization: Bearer $AUTH_TOKEN"

# ブックマーク更新
curl -X PATCH http://localhost:3000/bookmarks/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $AUTH_TOKEN" \
  -d '{
    "bookmark": {
      "title": "更新後のタイトル"
    }
  }'

# ブックマーク削除
curl -X DELETE http://localhost:3000/bookmarks/1 \
  -H "Authorization: Bearer $AUTH_TOKEN"
```
