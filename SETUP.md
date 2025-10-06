# セットアップガイド

このガイドでは、TODO管理アプリケーションのセットアップ手順を説明します。

## 前提条件

以下のソフトウェアがインストールされている必要があります：

- Docker Desktop
- Git

## 1. Google OAuth 2.0 の設定

### 1.1 Google Cloud Consoleでプロジェクトを作成

1. [Google Cloud Console](https://console.cloud.google.com/) にアクセス
2. 新しいプロジェクトを作成（または既存のプロジェクトを選択）
3. プロジェクト名を入力して「作成」

### 1.2 OAuth認証情報の作成

1. 左サイドバーから「APIとサービス」→「認証情報」を選択
2. 「認証情報を作成」→「OAuthクライアントID」をクリック
3. 同意画面の設定がまだの場合、「同意画面を設定」をクリック
   - ユーザーの種類：「外部」を選択（テスト用）
   - アプリ名、ユーザーサポートメール、デベロッパー連絡先を入力
   - スコープは追加不要（デフォルトのまま）
   - テストユーザーを追加（自分のGoogleアカウントを追加）
4. 再度「認証情報を作成」→「OAuthクライアントID」
5. アプリケーションの種類：「ウェブアプリケーション」
6. 名前を入力（例：TODO App）
7. 承認済みのリダイレクトURIを追加：
   ```
   http://localhost:3000/auth/google_oauth2/callback
   ```
8. 「作成」をクリック
9. クライアントIDとクライアントシークレットをメモ

## 2. 環境変数の設定

### 2.1 .envファイルの作成

リポジトリのルートディレクトリで以下を実行：

```bash
cp .env.sample .env
```

### 2.2 .envファイルの編集

`.env`ファイルを開き、以下の値を設定：

```
GOOGLE_CLIENT_ID=<Google Cloud Consoleで取得したクライアントID>
GOOGLE_CLIENT_SECRET=<Google Cloud Consoleで取得したクライアントシークレット>
JWT_SECRET_KEY=<ランダムな文字列（任意）>
FRONTEND_URL=http://localhost:8080
```

JWT_SECRET_KEYの生成例（ターミナルで実行）：
```bash
openssl rand -hex 32
```

## 3. アプリケーションの起動

### 3.1 Dockerコンテナのビルドと起動

```bash
docker compose up -d --build
```

初回は依存関係のインストールに時間がかかります（5-10分程度）。

### 3.2 データベースのセットアップ

```bash
docker compose exec api ./bin/rails db:migrate
```

### 3.3 動作確認

ブラウザで以下のURLにアクセス：

- **フロントエンド**: http://localhost:8080
- **バックエンドAPI**: http://localhost:3000

## 4. トラブルシューティング

### コンテナが起動しない場合

```bash
# コンテナのログを確認
docker compose logs api
docker compose logs front

# コンテナを再起動
docker compose down
docker compose up -d
```

### データベースのリセット

```bash
docker compose exec api ./bin/rails db:reset
```

### 依存関係の再インストール

#### バックエンド
```bash
docker compose exec api bundle install
```

#### フロントエンド
```bash
docker compose exec front npm install
```

### ポートが使用中の場合

docker-compose.ymlのポート番号を変更してください：

```yaml
services:
  api:
    ports:
      - "3001:3000"  # 3001に変更
  front:
    ports:
      - "8081:8080"  # 8081に変更
```

変更後、以下を実行：
```bash
docker compose down
docker compose up -d
```

## 5. 開発モードでの起動

### バックエンド開発サーバー

```bash
docker compose exec api ./bin/rails server -b 0.0.0.0
```

### フロントエンド開発サーバー

```bash
docker compose exec front npm run server
```

## 6. テストの実行

### バックエンドテスト

```bash
docker compose exec -e RAILS_ENV=test api bundle exec rspec
```

### フロントエンドテスト

```bash
docker compose exec front npm run test
```

### コード検証

#### Rubocop（バックエンド）
```bash
docker compose exec api bundle exec rubocop
```

#### ESLint（フロントエンド）
```bash
docker compose exec front npm run lint
```

## 7. 開発の進め方

### ホットリロード

両方のコンテナはホットリロードに対応しています：

- バックエンド：ファイルを変更すると自動的に再読み込み
- フロントエンド：ファイルを変更すると自動的にブラウザが更新

### Rails console

```bash
docker compose exec api ./bin/rails console
```

### データベース操作

```bash
# マイグレーション作成
docker compose exec api ./bin/rails generate migration CreateNewModel

# マイグレーション実行
docker compose exec api ./bin/rails db:migrate

# ロールバック
docker compose exec api ./bin/rails db:rollback
```

## 8. 本番環境へのデプロイ

本番環境にデプロイする際は、以下の点に注意してください：

1. **環境変数の設定**
   - `JWT_SECRET_KEY`は強固なランダム文字列を使用
   - `FRONTEND_URL`を本番環境のURLに変更

2. **Google OAuth設定**
   - 承認済みリダイレクトURIに本番環境のURLを追加
   - 例：`https://your-domain.com/auth/google_oauth2/callback`

3. **データベース**
   - 本番環境ではPostgreSQLやMySQLの使用を推奨
   - `config/database.yml`を環境に応じて変更

4. **セキュリティ**
   - HTTPS を有効化
   - CORS設定を本番環境用に調整
   - セッションクッキーのSecure属性を有効化

## サポート

問題が発生した場合は、以下を確認してください：

1. Dockerが正常に動作しているか
2. ポートが他のアプリケーションで使用されていないか
3. `.env`ファイルが正しく設定されているか
4. Google OAuth認証情報が正しいか

それでも解決しない場合は、GitHubのIssuesで報告してください。
