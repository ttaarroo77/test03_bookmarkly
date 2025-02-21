# curl テストのタイミング検討

## 実施タイミング

1. **基本的なAPI実装後**
   - Deviseによる認証機能の実装完了後
   - BookmarksControllerの基本CRUD実装後
   - 最初のデプロイ前の動作確認として

2. **具体的な手順**
   ```bash
   # 1. まずDevise認証のテスト
   curl -X POST http://localhost:3000/users/sign_in \
     -H "Content-Type: application/json" \
     -d '{"user": {"email": "test@example.com", "password": "password123"}}'

   # 2. 認証成功後、ブックマークのCRUD操作テスト
   # 3. タグ機能やその他の機能テスト
   ```

## メリット

1. **早期のバグ発見**
   - フロントエンド実装前にAPIの動作を確認
   - 認証周りの問題を早期に発見可能

2. **ドキュメントとしての価値**
   - APIの使用例として残せる
   - フロントエンド開発者との共有資料に

## 次のステップ

1. `docs/overview_0/api_test_commands.md` の内容を実際のエンドポイントに合わせて更新
2. テスト実行結果をドキュメントに記録
3. 発見された問題点の修正とフィードバック

## 備考

- テスト実行時は開発環境のデータを使用
- セキュリティ面での考慮事項も記録
- 本番環境でのテスト実行は慎重に判断 