# TODO管理アプリ

Rails API + React SPAで構築されたTODO管理アプリケーションです。

## 機能

- Google OAuth 2.0認証 + JWT
- TODOの作成・編集・削除・完了切り替え
- 優先度による色分け表示（高=赤、中=黄、低=緑）
- 期限表示（本日締め切り、期限切れのハイライト表示）
- 優先度フィルター機能
- レスポンシブデザイン（ポップでカラフルなUI）

## 技術スタック

### バックエンド
- Ruby 3.2.9
- Rails 7.1.0（API モード）
- SQLite3
- JWT認証
- OmniAuth Google OAuth2

### フロントエンド
- React 18.2
- Vite
- React Router
- Axios
- Vitest（テスト）

## セットアップ

### 1. リポジトリのクローン

```bash
git clone <repository-url>
cd REACT-RAILS-TODO-APP-by-copilot
```

### 2. 環境変数の設定

```bash
cp .env.sample .env
```

`.env`ファイルを編集して、Google OAuth認証情報を設定してください：

```
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
JWT_SECRET_KEY=your-jwt-secret-key
FRONTEND_URL=http://localhost:8080
```

### 3. Google OAuth設定

1. [Google Cloud Console](https://console.cloud.google.com/)でプロジェクトを作成
2. 「APIとサービス」→「認証情報」を選択
3. 「認証情報を作成」→「OAuthクライアントID」を選択
4. アプリケーションの種類: ウェブアプリケーション
5. 承認済みのリダイレクトURIに`http://localhost:3000/auth/google_oauth2/callback`を追加
6. クライアントIDとシークレットを取得して`.env`に設定

### 4. コンテナの起動

```bash
docker compose up -d
```

### 5. データベースのセットアップ

```bash
docker compose exec api ./bin/rails db:migrate
```

### 6. アプリケーションへのアクセス

- フロントエンド: http://localhost:8080
- バックエンドAPI: http://localhost:3000

## 開発コマンド

### バックエンド（Rails API）

```bash
# 依存関係のインストール
docker compose exec api bundle install

# 開発サーバーの起動
docker compose exec api ./bin/rails server -b 0.0.0.0

# Rails console
docker compose exec api ./bin/rails console

# Rubocop（コード検証）
docker compose exec api bundle exec rubocop

# Rubocop（自動修正）
docker compose exec api bundle exec rubocop -A

# マイグレーション実行
docker compose exec api ./bin/rails db:migrate

# データベースリセット
docker compose exec api ./bin/rails db:reset

# テスト実行
docker compose exec -e RAILS_ENV=test api bundle exec rspec
```

### フロントエンド（React）

```bash
# 開発サーバーの起動
docker compose exec front npm run server

# ビルド
docker compose exec front npm run build

# ビルド済みコード用サーバー
docker compose exec front npm run server:dist

# ESLint（コード検証）
docker compose exec front npm run lint

# テスト実行
docker compose exec front npm run test
```

## プロジェクト構造

```
.
├── api/                    # Rails APIバックエンド
│   ├── app/
│   │   ├── controllers/    # コントローラー
│   │   ├── models/         # モデル
│   │   └── lib/            # ライブラリ（JWT等）
│   ├── config/             # 設定ファイル
│   ├── db/                 # データベース
│   └── spec/               # RSpecテスト
├── front/                  # Reactフロントエンド
│   ├── src/
│   │   ├── components/     # Reactコンポーネント
│   │   ├── pages/          # ページコンポーネント
│   │   ├── api/            # APIクライアント
│   │   └── utils/          # ユーティリティ
│   └── public/             # 静的ファイル
└── docker-compose.yml      # Docker Compose設定
```

## 仕様

### TODO項目

- TODO名（必須、最大255文字）
- 期限（年月日）
- 完了フラグ
- 優先度（高=2、中=1、低=0）※デフォルトは中

### 表示順序

1. 優先度の降順
2. 期限の昇順（期限なしは最初に表示）

### 色分け

- **優先度**: 高=赤、中=黄、低=緑
- **期限**:
  - 本日締め切り（未完了）: オレンジ色太字
  - 期限切れ（未完了）: 赤色太字
  - 完了済み: 通常表示

## ライセンス

MIT
