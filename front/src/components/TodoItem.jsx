import './TodoItem.css'

function TodoItem({ todo, onEdit, onDelete, onToggleComplete }) {
  const getPriorityClass = (priority) => {
    switch (priority) {
      case 2: return 'priority-high'
      case 1: return 'priority-medium'
      case 0: return 'priority-low'
      default: return 'priority-medium'
    }
  }

  const getPriorityLabel = (priority) => {
    switch (priority) {
      case 2: return '高'
      case 1: return '中'
      case 0: return '低'
      default: return '中'
    }
  }

  const formatDueDate = (dueDate) => {
    if (!dueDate) return null

    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const due = new Date(dueDate + 'T00:00:00')
    
    // 完了済みの場合は通常表示
    if (todo.completed) {
      return <span className="due-date">{dueDate}</span>
    }

    // 本日締め切りの場合
    if (due.getTime() === today.getTime()) {
      return (
        <span className="due-date due-today">
          本日締め切り ({dueDate})
        </span>
      )
    }

    // 期限切れの場合
    if (due < today) {
      return <span className="due-date due-overdue">{dueDate}</span>
    }

    // 通常表示
    return <span className="due-date">{dueDate}</span>
  }

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <div className="todo-content">
        <div className="todo-header">
          <div className="todo-header-left">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => onToggleComplete(todo)}
              className="todo-checkbox"
            />
            <h3 className={`todo-title ${todo.completed ? 'completed-text' : ''}`}>
              {todo.title}
            </h3>
          </div>
        </div>
        
        {todo.due_date && (
          <div className="todo-due-date">
            {formatDueDate(todo.due_date)}
          </div>
        )}
      </div>

      <span className={`priority-badge ${getPriorityClass(todo.priority)}`}>
        {getPriorityLabel(todo.priority)}
      </span>

      <div className="todo-actions">
        <button onClick={() => onEdit(todo)} className="edit-button">
          編集
        </button>
        <button onClick={() => onDelete(todo.id)} className="delete-button">
          削除
        </button>
      </div>
    </div>
  )
}

export default TodoItem
