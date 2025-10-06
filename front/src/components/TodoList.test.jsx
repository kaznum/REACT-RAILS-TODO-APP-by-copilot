import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import TodoList from './TodoList'

describe('TodoList', () => {
  const mockTodos = [
    {
      id: 1,
      title: 'TODO 1',
      due_date: '2024-12-31',
      priority: 2,
      completed: false
    },
    {
      id: 2,
      title: 'TODO 2',
      due_date: '2024-11-15',
      priority: 1,
      completed: true
    }
  ]

  const mockHandlers = {
    onEdit: vi.fn(),
    onDelete: vi.fn(),
    onToggleComplete: vi.fn()
  }

  it('renders all todos', () => {
    render(<TodoList todos={mockTodos} {...mockHandlers} />)
    expect(screen.getByText('TODO 1')).toBeInTheDocument()
    expect(screen.getByText('TODO 2')).toBeInTheDocument()
  })

  it('displays empty state when no todos', () => {
    render(<TodoList todos={[]} {...mockHandlers} />)
    expect(screen.getByText('TODOがありません')).toBeInTheDocument()
    expect(screen.getByText('新しいTODOを追加してみましょう！')).toBeInTheDocument()
  })

  it('renders correct number of todo items', () => {
    const { container } = render(<TodoList todos={mockTodos} {...mockHandlers} />)
    const todoItems = container.querySelectorAll('.todo-item')
    expect(todoItems).toHaveLength(2)
  })

  it('passes correct props to TodoItem components', () => {
    render(<TodoList todos={mockTodos} {...mockHandlers} />)
    // TodoItem が正しくレンダリングされていることを確認
    expect(screen.getByText('TODO 1')).toBeInTheDocument()
    expect(screen.getByText('TODO 2')).toBeInTheDocument()
  })
})
