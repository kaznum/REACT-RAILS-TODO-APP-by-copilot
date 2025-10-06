# WEB API インターフェース仕様書

## 認証

すべてのAPIエンドポイント（認証エンドポイントを除く）は、JWTトークンによる認証が必要です。

### リクエストヘッダー

```
Authorization: Bearer <JWT_TOKEN>
```

### 認証エンドポイント

#### Google OAuth認証

- **URL**: `/auth/google_oauth2`
- **Method**: `GET`
- **説明**: Google OAuth2認証を開始します
- **レスポンス**: Google認証ページにリダイレクトされます

#### OAuth コールバック

- **URL**: `/auth/google_oauth2/callback`
- **Method**: `GET`
- **説明**: Google OAuth2認証完了後のコールバック
- **レスポンス**: フロントエンドの`/login?token=<JWT_TOKEN>`にリダイレクトされます

## TODOs API

### TODO一覧取得

- **URL**: `/api/v1/todos`
- **Method**: `GET`
- **認証**: 必要
- **説明**: ログインユーザーのTODO一覧を取得します（優先度降順、期限昇順）

**レスポンス例**:
```json
[
  {
    "id": 1,
    "title": "プロジェクトの資料作成",
    "due_date": "2024-01-15",
    "completed": false,
    "priority": 2,
    "user_id": 1,
    "created_at": "2024-01-01T00:00:00.000Z",
    "updated_at": "2024-01-01T00:00:00.000Z"
  }
]
```

### TODO詳細取得

- **URL**: `/api/v1/todos/:id`
- **Method**: `GET`
- **認証**: 必要
- **説明**: 指定されたIDのTODOを取得します

**レスポンス例**:
```json
{
  "id": 1,
  "title": "プロジェクトの資料作成",
  "due_date": "2024-01-15",
  "completed": false,
  "priority": 2,
  "user_id": 1,
  "created_at": "2024-01-01T00:00:00.000Z",
  "updated_at": "2024-01-01T00:00:00.000Z"
}
```

### TODO作成

- **URL**: `/api/v1/todos`
- **Method**: `POST`
- **認証**: 必要
- **説明**: 新しいTODOを作成します

**リクエストボディ**:
```json
{
  "todo": {
    "title": "プロジェクトの資料作成",
    "due_date": "2024-01-15",
    "priority": 2,
    "completed": false
  }
}
```

**パラメータ**:
- `title` (string, 必須): TODO名（最大255文字）
- `due_date` (date, 任意): 期限（YYYY-MM-DD形式）
- `priority` (integer, 任意): 優先度（0=低、1=中、2=高、デフォルト: 1）
- `completed` (boolean, 任意): 完了フラグ（デフォルト: false）

**レスポンス**:
- ステータスコード: 201 Created
- ボディ: 作成されたTODOオブジェクト

**エラーレスポンス**:
```json
{
  "errors": [
    "TODO名を入力してください"
  ]
}
```

### TODO更新

- **URL**: `/api/v1/todos/:id`
- **Method**: `PUT` または `PATCH`
- **認証**: 必要
- **説明**: 指定されたIDのTODOを更新します

**リクエストボディ**:
```json
{
  "todo": {
    "title": "更新されたタイトル",
    "completed": true
  }
}
```

**レスポンス**:
- ステータスコード: 200 OK
- ボディ: 更新されたTODOオブジェクト

### TODO削除

- **URL**: `/api/v1/todos/:id`
- **Method**: `DELETE`
- **認証**: 必要
- **説明**: 指定されたIDのTODOを削除します

**レスポンス**:
- ステータスコード: 204 No Content
- ボディ: なし

## Users API

### 現在のユーザー情報取得

- **URL**: `/api/v1/current_user`
- **Method**: `GET`
- **認証**: 必要
- **説明**: ログインユーザーの情報を取得します

**レスポンス例**:
```json
{
  "id": 1,
  "email": "user@example.com",
  "name": "田中太郎",
  "image_url": "https://example.com/avatar.jpg"
}
```

## エラーレスポンス

### 認証エラー

**ステータスコード**: 401 Unauthorized

```json
{
  "error": "認証が必要です"
}
```

### リソースが見つからない

**ステータスコード**: 404 Not Found

```json
{
  "error": "TODOが見つかりません"
}
```

### バリデーションエラー

**ステータスコード**: 422 Unprocessable Entity

```json
{
  "errors": [
    "TODO名を入力してください",
    "優先度は0, 1, 2のいずれかを選択してください"
  ]
}
```

## データモデル

### User

| フィールド | 型 | 説明 |
|-----------|-----|------|
| id | integer | ユーザーID |
| email | string | メールアドレス |
| name | string | 名前 |
| image_url | string | プロフィール画像URL |
| provider | string | OAuth プロバイダー（google_oauth2） |
| uid | string | OAuth UID |
| created_at | datetime | 作成日時 |
| updated_at | datetime | 更新日時 |

### Todo

| フィールド | 型 | 説明 |
|-----------|-----|------|
| id | integer | TODO ID |
| title | string | TODO名（最大255文字） |
| due_date | date | 期限 |
| completed | boolean | 完了フラグ |
| priority | integer | 優先度（0=低、1=中、2=高） |
| user_id | integer | ユーザーID（外部キー） |
| created_at | datetime | 作成日時 |
| updated_at | datetime | 更新日時 |
