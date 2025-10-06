import { useState, useEffect } from 'react'
import './TodoForm.css'

function TodoForm({ todo, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    title: '',
    due_date: '',
    priority: 1,
    completed: false
  })

  useEffect(() => {
    if (todo) {
      setFormData({
        title: todo.title || '',
        due_date: todo.due_date || '',
        priority: todo.priority ?? 1,
        completed: todo.completed || false
      })
    }
  }, [todo])

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!formData.title.trim()) {
      alert('TODO名を入力してください')
      return
    }

    if (formData.title.length > 255) {
      alert('TODO名は255文字以内で入力してください')
      return
    }

    if (todo) {
      onSubmit(todo.id, formData)
    } else {
      onSubmit(formData)
    }
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    })
  }

  return (
    <div className="todo-form-container">
      <h2 className="form-title">{todo ? 'TODOを編集' : '新しいTODOを作成'}</h2>
      <form onSubmit={handleSubmit} className="todo-form">
        <div className="form-group">
          <label htmlFor="title">TODO名 *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="例: プロジェクトの資料作成"
            maxLength={255}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="due_date">期限</label>
          <input
            type="date"
            id="due_date"
            name="due_date"
            value={formData.due_date}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="priority">優先度</label>
          <select
            id="priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
          >
            <option value="0">低</option>
            <option value="1">中</option>
            <option value="2">高</option>
          </select>
        </div>

        {todo && (
          <div className="form-group checkbox-group">
            <label>
              <input
                type="checkbox"
                name="completed"
                checked={formData.completed}
                onChange={handleChange}
              />
              <span>完了</span>
            </label>
          </div>
        )}

        <div className="form-actions">
          <button type="button" onClick={onCancel} className="cancel-button">
            キャンセル
          </button>
          <button type="submit" className="submit-button">
            {todo ? '更新' : '作成'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default TodoForm
