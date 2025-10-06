import './Manual.css'

function Manual() {
  return (
    <div className="manual-container">
      <header className="manual-header">
        <div className="header-content">
          <h1 className="manual-title">ユーザーマニュアル</h1>
        </div>
      </header>

      <main className="manual-main">
        <section className="manual-section">
          <h2>📝 TODO管理アプリについて</h2>
          <p>
            このアプリは、タスク（TODO）を効率的に管理するためのWebアプリケーションです。
            Google認証でログインし、TODOの追加、編集、削除、完了状態の管理ができます。
          </p>
        </section>

        <section className="manual-section">
          <h2>🚀 はじめに</h2>
          <h3>ログイン</h3>
          <ol>
            <li>トップページにアクセスします</li>
            <li>「Googleでログイン」ボタンをクリックします</li>
            <li>Googleアカウントで認証を行います</li>
            <li>認証が成功すると、TODO一覧画面に自動的に移動します</li>
          </ol>
        </section>

        <section className="manual-section">
          <h2>✅ 基本的な使い方</h2>
          
          <h3>TODOの追加</h3>
          <ol>
            <li>TODO一覧画面で「＋ 新しいTODOを追加」ボタンをクリックします</li>
            <li>フォームに必要な情報を入力します：
              <ul>
                <li><strong>TODO名</strong>：タスクの名前（必須、最大255文字）</li>
                <li><strong>期限</strong>：タスクの締切日（任意）</li>
                <li><strong>優先度</strong>：高（赤）、中（黄）、低（緑）から選択（デフォルトは中）</li>
              </ul>
            </li>
            <li>「追加」ボタンをクリックして保存します</li>
            <li>キャンセルする場合は「キャンセル」ボタンをクリックします</li>
          </ol>

          <h3>TODOの編集</h3>
          <ol>
            <li>TODO一覧から編集したいTODOの「編集」ボタンをクリックします</li>
            <li>フォームが表示されるので、内容を修正します</li>
            <li>「更新」ボタンをクリックして保存します</li>
          </ol>

          <h3>TODOの削除</h3>
          <ol>
            <li>TODO一覧から削除したいTODOの「削除」ボタンをクリックします</li>
            <li>確認ダイアログが表示されるので、「OK」をクリックします</li>
          </ol>

          <h3>TODOの完了/未完了の切り替え</h3>
          <ol>
            <li>TODO一覧のチェックボックスをクリックします</li>
            <li>チェックを入れると完了状態になり、取り消すと未完了状態になります</li>
          </ol>
        </section>

        <section className="manual-section">
          <h2>🎯 優先度について</h2>
          <p>TODOには3つの優先度レベルがあります：</p>
          <ul>
            <li><span className="priority-badge priority-high">高</span>：重要度が高いタスク（赤色で表示）</li>
            <li><span className="priority-badge priority-medium">中</span>：通常の重要度のタスク（黄色で表示）</li>
            <li><span className="priority-badge priority-low">低</span>：重要度が低いタスク（緑色で表示）</li>
          </ul>
          <p>TODOは優先度の高い順、同じ優先度の場合は期限の早い順に表示されます。</p>
        </section>

        <section className="manual-section">
          <h2>🔍 フィルター機能</h2>
          <p>優先度でTODOを絞り込むことができます：</p>
          <ol>
            <li>画面上部の「優先度フィルター」ドロップダウンを開きます</li>
            <li>表示したい優先度（低、中、高）を選択します</li>
            <li>「選択なし」を選ぶと全てのTODOが表示されます</li>
          </ol>
        </section>

        <section className="manual-section">
          <h2>📅 期限の表示について</h2>
          <p>期限は以下のように色分けされて表示されます：</p>
          <ul>
            <li><strong className="deadline-overdue">赤色太字</strong>：期限切れ（未完了のみ）</li>
            <li><strong className="deadline-today">オレンジ色太字</strong>：本日締め切り（未完了のみ）</li>
            <li>通常表示：上記以外、または完了済み</li>
          </ul>
        </section>

        <section className="manual-section">
          <h2>🚪 ログアウト</h2>
          <ol>
            <li>画面右上のユーザー情報エリアにある「ログアウト」ボタンをクリックします</li>
            <li>ログイン画面に戻ります</li>
          </ol>
        </section>

        <section className="manual-section">
          <h2>💡 ヒント</h2>
          <ul>
            <li>TODOは優先度と期限を設定することで、効率的にタスクを管理できます</li>
            <li>完了したTODOはチェックを入れることで、進捗状況を把握しやすくなります</li>
            <li>優先度フィルターを使って、今取り組むべきタスクに集中できます</li>
            <li>定期的にTODOリストを見直して、不要なタスクは削除しましょう</li>
          </ul>
        </section>
      </main>
    </div>
  )
}

export default Manual
