/**
 * TODOのソート関数
 * バックエンドのソートロジックと同じ順序でソート:
 * 1. 優先度の降順 (高->中->低)
 * 2. 期限の昇順 (期限なしは最初に表示)
 */
export const sortTodos = (todos) => {
  return [...todos].sort((a, b) => {
    // 優先度で降順ソート (2 -> 1 -> 0)
    if (a.priority !== b.priority) {
      return b.priority - a.priority
    }

    // 優先度が同じ場合、期限でソート
    // 期限なしは最初に表示
    if (!a.due_date && !b.due_date) return 0
    if (!a.due_date) return -1
    if (!b.due_date) return 1

    // 両方期限がある場合、昇順ソート
    return new Date(a.due_date) - new Date(b.due_date)
  })
}
