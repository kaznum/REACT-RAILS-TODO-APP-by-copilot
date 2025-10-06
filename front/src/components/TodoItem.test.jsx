import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import TodoItem from './TodoItem'

describe('TodoItem', () => {
  const mockTodo = {
    id: 1,
    title: 'テストTODO',
    due_date: '2024-12-31',
    priority: 1,
    completed: false
  }

  const mockHandlers = {
    onEdit: vi.fn(),
    onDelete: vi.fn(),
    onToggleComplete: vi.fn()
  }

  it('renders todo item with title', () => {
    render(<TodoItem todo={mockTodo} {...mockHandlers} />)
    expect(screen.getByText('テストTODO')).toBeInTheDocument()
  })

  it('displays priority badge correctly', () => {
    const { rerender } = render(<TodoItem todo={{ ...mockTodo, priority: 2 }} {...mockHandlers} />)
    expect(screen.getByText('高')).toBeInTheDocument()

    rerender(<TodoItem todo={{ ...mockTodo, priority: 1 }} {...mockHandlers} />)
    expect(screen.getByText('中')).toBeInTheDocument()

    rerender(<TodoItem todo={{ ...mockTodo, priority: 0 }} {...mockHandlers} />)
    expect(screen.getByText('低')).toBeInTheDocument()
  })

  it('displays due date when provided', () => {
    render(<TodoItem todo={mockTodo} {...mockHandlers} />)
    expect(screen.getByText('2024-12-31')).toBeInTheDocument()
  })

  it('does not display due date when not provided', () => {
    const todoWithoutDate = { ...mockTodo, due_date: null }
    render(<TodoItem todo={todoWithoutDate} {...mockHandlers} />)
    expect(screen.queryByText(/2024-12-31/)).not.toBeInTheDocument()
  })

  it('displays due today message for today\'s date', () => {
    const today = new Date().toISOString().split('T')[0]
    const todoToday = { ...mockTodo, due_date: today }
    render(<TodoItem todo={todoToday} {...mockHandlers} />)
    expect(screen.getByText(/本日締め切り/)).toBeInTheDocument()
  })

  it('applies completed class when todo is completed', () => {
    const completedTodo = { ...mockTodo, completed: true }
    const { container } = render(<TodoItem todo={completedTodo} {...mockHandlers} />)
    expect(container.querySelector('.todo-item.completed')).toBeInTheDocument()
  })

  it('calls onToggleComplete when checkbox is clicked', () => {
    render(<TodoItem todo={mockTodo} {...mockHandlers} />)
    const checkbox = screen.getByRole('checkbox')
    fireEvent.click(checkbox)
    expect(mockHandlers.onToggleComplete).toHaveBeenCalledWith(mockTodo)
  })

  it('calls onEdit when edit button is clicked', () => {
    render(<TodoItem todo={mockTodo} {...mockHandlers} />)
    const editButton = screen.getByText('編集')
    fireEvent.click(editButton)
    expect(mockHandlers.onEdit).toHaveBeenCalledWith(mockTodo)
  })

  it('calls onDelete when delete button is clicked', () => {
    render(<TodoItem todo={mockTodo} {...mockHandlers} />)
    const deleteButton = screen.getByText('削除')
    fireEvent.click(deleteButton)
    expect(mockHandlers.onDelete).toHaveBeenCalledWith(mockTodo.id)
  })

  it('checkbox is checked when todo is completed', () => {
    const completedTodo = { ...mockTodo, completed: true }
    render(<TodoItem todo={completedTodo} {...mockHandlers} />)
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).toBeChecked()
  })

  it('checkbox is unchecked when todo is not completed', () => {
    render(<TodoItem todo={mockTodo} {...mockHandlers} />)
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).not.toBeChecked()
  })

  it('priority badge maintains consistent alignment with today due date', () => {
    const today = new Date().toISOString().split('T')[0]
    const todoToday = { ...mockTodo, due_date: today }
    const { container } = render(<TodoItem todo={todoToday} {...mockHandlers} />)
    
    // Verify priority badge is present
    expect(screen.getByText('中')).toBeInTheDocument()
    
    // Verify due today message is present
    expect(screen.getByText(/本日締め切り/)).toBeInTheDocument()
    
    // Verify the todo-header has the correct structure
    const todoHeader = container.querySelector('.todo-header')
    expect(todoHeader).toBeInTheDocument()
    expect(todoHeader.querySelector('.priority-badge')).toBeInTheDocument()
  })

  it('priority badge maintains consistent alignment with overdue date', () => {
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    const overdueDate = yesterday.toISOString().split('T')[0]
    const todoOverdue = { ...mockTodo, due_date: overdueDate }
    const { container } = render(<TodoItem todo={todoOverdue} {...mockHandlers} />)
    
    // Verify priority badge is present
    expect(screen.getByText('中')).toBeInTheDocument()
    
    // Verify overdue date is displayed
    expect(screen.getByText(overdueDate)).toBeInTheDocument()
    
    // Verify the todo-header has the correct structure
    const todoHeader = container.querySelector('.todo-header')
    expect(todoHeader).toBeInTheDocument()
    expect(todoHeader.querySelector('.priority-badge')).toBeInTheDocument()
  })
})
