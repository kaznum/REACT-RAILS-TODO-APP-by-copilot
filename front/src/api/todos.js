import client from './client'

export const getTodos = async () => {
  const response = await client.get('/api/v1/todos')
  return response.data
}

export const createTodo = async (todo) => {
  const response = await client.post('/api/v1/todos', { todo })
  return response.data
}

export const updateTodo = async (id, todo) => {
  const response = await client.put(`/api/v1/todos/${id}`, { todo })
  return response.data
}

export const deleteTodo = async (id) => {
  await client.delete(`/api/v1/todos/${id}`)
}

export const getCurrentUser = async () => {
  const response = await client.get('/api/v1/current_user')
  return response.data
}
