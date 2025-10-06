import TodoItem from './TodoItem'
import './TodoList.css'

function TodoList({ todos, onEdit, onDelete, onToggleComplete }) {
  if (todos.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📝</div>
        <h3>TODOがありません</h3>
        <p>新しいTODOを追加してみましょう！</p>
      </div>
    )
  }

  return (
    <div className="todo-list">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggleComplete={onToggleComplete}
        />
      ))}
    </div>
  )
}

export default TodoList
