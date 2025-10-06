import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import TodoForm from './TodoForm'

describe('TodoForm', () => {
  const mockOnSubmit = vi.fn()
  const mockOnCancel = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Create mode', () => {
    it('renders form with create title', () => {
      render(<TodoForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />)
      expect(screen.getByText('新しいTODOを作成')).toBeInTheDocument()
    })

    it('renders all form fields', () => {
      render(<TodoForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />)
      expect(screen.getByLabelText(/TODO名/)).toBeInTheDocument()
      expect(screen.getByLabelText(/期限/)).toBeInTheDocument()
      expect(screen.getByLabelText(/優先度/)).toBeInTheDocument()
    })

    it('submits form with valid data', async () => {
      render(<TodoForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />)
      
      const titleInput = screen.getByLabelText(/TODO名/)
      const dueDateInput = screen.getByLabelText(/期限/)
      const prioritySelect = screen.getByLabelText(/優先度/)
      
      fireEvent.change(titleInput, { target: { value: '新しいTODO' } })
      fireEvent.change(dueDateInput, { target: { value: '2024-12-31' } })
      fireEvent.change(prioritySelect, { target: { value: '2' } })
      
      const submitButton = screen.getByText('作成')
      fireEvent.click(submitButton)
      
      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledWith({
          title: '新しいTODO',
          due_date: '2024-12-31',
          priority: '2',
          completed: false
        })
      })
    })

    it('shows alert when title is whitespace only', async () => {
      const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {})
      
      render(<TodoForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />)
      
      const titleInput = screen.getByLabelText(/TODO名/)
      
      // スペースだけの入力でテスト（HTML5バリデーションを回避）
      fireEvent.change(titleInput, { target: { value: '   ' } })
      
      const submitButton = screen.getByText('作成')
      fireEvent.click(submitButton)
      
      await waitFor(() => {
        expect(alertSpy).toHaveBeenCalledWith('TODO名を入力してください')
        expect(mockOnSubmit).not.toHaveBeenCalled()
      })
      
      alertSpy.mockRestore()
    })

    it('shows alert when title is too long', async () => {
      const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {})
      
      render(<TodoForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />)
      
      const titleInput = screen.getByLabelText(/TODO名/)
      const longTitle = 'a'.repeat(256)
      fireEvent.change(titleInput, { target: { value: longTitle } })
      
      const submitButton = screen.getByText('作成')
      fireEvent.click(submitButton)
      
      await waitFor(() => {
        expect(alertSpy).toHaveBeenCalledWith('TODO名は255文字以内で入力してください')
        expect(mockOnSubmit).not.toHaveBeenCalled()
      })
      
      alertSpy.mockRestore()
    })
  })

  describe('Edit mode', () => {
    const mockTodo = {
      id: 1,
      title: '既存のTODO',
      due_date: '2024-11-15',
      priority: 1,
      completed: false
    }

    it('renders form with edit title', () => {
      render(<TodoForm todo={mockTodo} onSubmit={mockOnSubmit} onCancel={mockOnCancel} />)
      expect(screen.getByText('TODOを編集')).toBeInTheDocument()
    })

    it('populates form with todo data', () => {
      render(<TodoForm todo={mockTodo} onSubmit={mockOnSubmit} onCancel={mockOnCancel} />)
      
      const titleInput = screen.getByLabelText(/TODO名/)
      const dueDateInput = screen.getByLabelText(/期限/)
      const prioritySelect = screen.getByLabelText(/優先度/)
      
      expect(titleInput).toHaveValue('既存のTODO')
      expect(dueDateInput).toHaveValue('2024-11-15')
      expect(prioritySelect).toHaveValue('1')
    })

    it('submits form with updated data', async () => {
      render(<TodoForm todo={mockTodo} onSubmit={mockOnSubmit} onCancel={mockOnCancel} />)
      
      const titleInput = screen.getByLabelText(/TODO名/)
      fireEvent.change(titleInput, { target: { value: '更新されたTODO' } })
      
      const submitButton = screen.getByText('更新')
      fireEvent.click(submitButton)
      
      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledWith(
          mockTodo.id,
          expect.objectContaining({
            title: '更新されたTODO'
          })
        )
      })
    })

    it('displays update button instead of create button', () => {
      render(<TodoForm todo={mockTodo} onSubmit={mockOnSubmit} onCancel={mockOnCancel} />)
      expect(screen.getByText('更新')).toBeInTheDocument()
      expect(screen.queryByText('作成')).not.toBeInTheDocument()
    })
  })

  describe('Cancel functionality', () => {
    it('calls onCancel when cancel button is clicked', () => {
      render(<TodoForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />)
      
      const cancelButton = screen.getByText('キャンセル')
      fireEvent.click(cancelButton)
      
      expect(mockOnCancel).toHaveBeenCalled()
    })
  })
})
