import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { removeToken } from '../utils/auth'
import { getTodos, createTodo, updateTodo, deleteTodo, getCurrentUser } from '../api/todos'
import TodoForm from '../components/TodoForm'
import TodoList from '../components/TodoList'
import './Todos.css'

function Todos() {
  const navigate = useNavigate()
  const [todos, setTodos] = useState([])
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingTodo, setEditingTodo] = useState(null)
  const [priorityFilter, setPriorityFilter] = useState(null)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      const [userData, todosData] = await Promise.all([
        getCurrentUser(),
        getTodos()
      ])
      setUser(userData)
      setTodos(todosData)
    } catch (error) {
      console.error('データの読み込みに失敗しました:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    removeToken()
    navigate('/login')
  }

  const handleAddTodo = async (todoData) => {
    try {
      const newTodo = await createTodo(todoData)
      setTodos([...todos, newTodo])
      setShowForm(false)
    } catch (error) {
      console.error('TODO作成に失敗しました:', error)
      alert('TODO作成に失敗しました')
    }
  }

  const handleUpdateTodo = async (id, todoData) => {
    try {
      const updatedTodo = await updateTodo(id, todoData)
      setTodos(todos.map(todo => todo.id === id ? updatedTodo : todo))
      setEditingTodo(null)
      setShowForm(false)
    } catch (error) {
      console.error('TODO更新に失敗しました:', error)
      alert('TODO更新に失敗しました')
    }
  }

  const handleDeleteTodo = async (id) => {
    if (!window.confirm('このTODOを削除してもよろしいですか？')) {
      return
    }
    
    try {
      await deleteTodo(id)
      setTodos(todos.filter(todo => todo.id !== id))
    } catch (error) {
      console.error('TODO削除に失敗しました:', error)
      alert('TODO削除に失敗しました')
    }
  }

  const handleEditTodo = (todo) => {
    setEditingTodo(todo)
    setShowForm(true)
  }

  const handleToggleComplete = async (todo) => {
    await handleUpdateTodo(todo.id, { ...todo, completed: !todo.completed })
  }

  const handleCancelForm = () => {
    setShowForm(false)
    setEditingTodo(null)
  }

  const filteredTodos = priorityFilter !== null
    ? todos.filter(todo => todo.priority === priorityFilter)
    : todos

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    )
  }

  return (
    <div className="todos-container">
      <header className="todos-header">
        <div className="header-content">
          <h1 className="todos-title">TODO管理</h1>
          {user && (
            <div className="user-info">
              {user.image_url && (
                <img src={user.image_url} alt={user.name} className="user-avatar" />
              )}
              <span className="user-name">{user.name}</span>
              <button onClick={handleLogout} className="logout-button">
                ログアウト
              </button>
            </div>
          )}
        </div>
      </header>

      <main className="todos-main">
        <div className="todos-controls">
          <div className="filter-section">
            <label htmlFor="priority-filter">優先度フィルター:</label>
            <select
              id="priority-filter"
              value={priorityFilter === null ? '' : priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value === '' ? null : parseInt(e.target.value))}
              className="priority-filter"
            >
              <option value="">選択なし</option>
              <option value="0">低</option>
              <option value="1">中</option>
              <option value="2">高</option>
            </select>
          </div>
          
          {!showForm && (
            <button onClick={() => setShowForm(true)} className="add-button">
              ＋ 新しいTODOを追加
            </button>
          )}
        </div>

        {showForm && (
          <TodoForm
            todo={editingTodo}
            onSubmit={editingTodo ? handleUpdateTodo : handleAddTodo}
            onCancel={handleCancelForm}
          />
        )}

        <TodoList
          todos={filteredTodos}
          onEdit={handleEditTodo}
          onDelete={handleDeleteTodo}
          onToggleComplete={handleToggleComplete}
        />
      </main>
    </div>
  )
}

export default Todos
