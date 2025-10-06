# 開発ガイド

このドキュメントでは、TODO管理アプリケーションの開発に貢献する方法を説明します。

## 開発環境のセットアップ

[SETUP.md](./SETUP.md)を参照してください。

## GitHub Copilot の活用

このプロジェクトには GitHub Copilot のための詳細なインストラクションが設定されています（[`.github/instructions/`](.github/instructions/)）。GitHub Copilot を使用すると、プロジェクト固有のコンテキストに基づいた適切なコード提案が得られます。

インストラクションには以下が含まれます：
- プロジェクトの構造とアーキテクチャ
- コーディング規約とベストプラクティス
- 開発コマンドとワークフロー
- WEB API の詳細仕様

## コーディング規約

### バックエンド (Rails)

- **スタイルガイド**: Rubocopの設定に従う
- **テスト**: RSpecで全機能のテストを書く
- **コミット前**: 以下を実行してエラーがないことを確認

```bash
docker compose exec api bundle exec rubocop
docker compose exec -e RAILS_ENV=test api bundle exec rspec
```

### フロントエンド (React)

- **スタイルガイド**: ESLintの設定に従う
- **テスト**: Vitestでコンポーネントのテストを書く
- **コミット前**: 以下を実行してエラーがないことを確認

```bash
docker compose exec front npm run lint
docker compose exec front npm run test
```

## プルリクエストのガイドライン

1. **ブランチの作成**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **変更の実装**
   - 小さく、理解しやすい変更にする
   - コミットメッセージは明確に

3. **テストの追加**
   - 新機能には必ずテストを追加
   - 既存のテストが壊れていないことを確認

4. **コード検証**
   ```bash
   # バックエンド
   docker compose exec api bundle exec rubocop
   docker compose exec -e RAILS_ENV=test api bundle exec rspec
   
   # フロントエンド
   docker compose exec front npm run lint
   docker compose exec front npm run test
   ```

5. **プルリクエストの作成**
   - 変更内容を明確に説明
   - スクリーンショットを添付（UIの変更の場合）
   - 関連するIssueをリンク

## コミットメッセージの規約

以下の形式を推奨します：

```
<type>: <subject>

<body>

<footer>
```

### Type
- `feat`: 新機能
- `fix`: バグ修正
- `docs`: ドキュメントのみの変更
- `style`: コードの意味に影響しない変更（空白、フォーマット等）
- `refactor`: バグ修正も機能追加もしないコード変更
- `test`: テストの追加・修正
- `chore`: ビルドプロセスやツールの変更

### 例

```
feat: TODO優先度フィルター機能を追加

- ドロップダウンで優先度を選択可能に
- フロントエンド側でフィルタリングを実行
- 選択なし、低、中、高の4つのオプション

Closes #123
```

## デバッグ

### バックエンドのデバッグ

```bash
# Railsコンソールで確認
docker compose exec api ./bin/rails console

# ログの確認
docker compose logs -f api
```

### フロントエンドのデバッグ

```bash
# ブラウザの開発者ツールを使用
# コンソールでエラーを確認

# ログの確認
docker compose logs -f front
```

## よくある開発タスク

### 新しいモデルの追加

```bash
# マイグレーション作成
docker compose exec api ./bin/rails generate model ModelName field1:type field2:type

# マイグレーション実行
docker compose exec api ./bin/rails db:migrate

# テストDBにも適用
docker compose exec -e RAILS_ENV=test api ./bin/rails db:migrate
```

### 新しいコントローラーの追加

```bash
docker compose exec api ./bin/rails generate controller ControllerName action1 action2
```

### 新しいReactコンポーネントの追加

```bash
# front/src/components/にファイルを作成
touch front/src/components/NewComponent.jsx
touch front/src/components/NewComponent.css
```

## テストの書き方

### RSpec (バックエンド)

```ruby
# spec/models/model_spec.rb
require 'rails_helper'

RSpec.describe ModelName, type: :model do
  describe 'validations' do
    it { should validate_presence_of(:field) }
  end

  describe 'associations' do
    it { should belong_to(:parent) }
  end

  describe '#method_name' do
    it 'does something' do
      # テストコード
    end
  end
end
```

### Vitest (フロントエンド)

```javascript
// src/components/__tests__/Component.test.jsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Component from '../Component'

describe('Component', () => {
  it('renders correctly', () => {
    render(<Component />)
    expect(screen.getByText('Expected Text')).toBeInTheDocument()
  })
})
```

## パフォーマンスの最適化

### バックエンド

- N+1クエリを避ける（`includes`を使用）
- データベースインデックスを適切に設定
- 必要に応じてキャッシュを実装

### フロントエンド

- 不要な再レンダリングを避ける（React.memo等）
- 画像を最適化
- コード分割を検討

## セキュリティ

- ユーザー入力は必ずバリデーション
- SQL インジェクション対策（Rails のパラメータ化クエリを使用）
- XSS 対策（React のデフォルト設定で対応済み）
- CSRF 対策（Rails のトークン認証で対応済み）
- 機密情報は環境変数で管理

## リリースプロセス

1. すべてのテストが通ることを確認
2. バージョン番号を更新
3. CHANGELOG.mdを更新
4. タグを作成
5. リリースノートを作成

## 質問やサポート

- GitHubのIssuesで質問
- プルリクエストでレビューを依頼
- ドキュメントを参照

## ライセンス

このプロジェクトはMITライセンスの下で公開されています。
