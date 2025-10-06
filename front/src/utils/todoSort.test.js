import { describe, it, expect } from 'vitest'
import { sortTodos } from './todoSort'

describe('sortTodos', () => {
  it('sorts todos by priority in descending order', () => {
    const todos = [
      { id: 1, title: 'Low', priority: 0, due_date: null },
      { id: 2, title: 'High', priority: 2, due_date: null },
      { id: 3, title: 'Medium', priority: 1, due_date: null }
    ]

    const sorted = sortTodos(todos)

    expect(sorted[0].priority).toBe(2) // High
    expect(sorted[1].priority).toBe(1) // Medium
    expect(sorted[2].priority).toBe(0) // Low
  })

  it('sorts todos with same priority by due date (null first)', () => {
    const todos = [
      { id: 1, title: 'With date 1', priority: 1, due_date: '2024-12-31' },
      { id: 2, title: 'No date', priority: 1, due_date: null },
      { id: 3, title: 'With date 2', priority: 1, due_date: '2024-11-15' }
    ]

    const sorted = sortTodos(todos)

    expect(sorted[0].due_date).toBe(null) // No date first
    expect(sorted[1].due_date).toBe('2024-11-15') // Earlier date
    expect(sorted[2].due_date).toBe('2024-12-31') // Later date
  })

  it('sorts by priority first, then by due date', () => {
    const todos = [
      { id: 1, title: 'Low with early date', priority: 0, due_date: '2024-01-01' },
      { id: 2, title: 'High with late date', priority: 2, due_date: '2024-12-31' },
      { id: 3, title: 'Medium no date', priority: 1, due_date: null },
      { id: 4, title: 'High no date', priority: 2, due_date: null }
    ]

    const sorted = sortTodos(todos)

    // Priority 2 (High) comes first
    expect(sorted[0].priority).toBe(2)
    expect(sorted[0].due_date).toBe(null) // No date within priority 2
    expect(sorted[1].priority).toBe(2)
    expect(sorted[1].due_date).toBe('2024-12-31') // With date within priority 2
    
    // Priority 1 (Medium) comes second
    expect(sorted[2].priority).toBe(1)
    
    // Priority 0 (Low) comes last
    expect(sorted[3].priority).toBe(0)
  })

  it('handles empty array', () => {
    const sorted = sortTodos([])
    expect(sorted).toEqual([])
  })

  it('does not mutate original array', () => {
    const todos = [
      { id: 1, title: 'Low', priority: 0, due_date: null },
      { id: 2, title: 'High', priority: 2, due_date: null }
    ]

    const original = [...todos]
    sortTodos(todos)

    expect(todos).toEqual(original)
  })
})
