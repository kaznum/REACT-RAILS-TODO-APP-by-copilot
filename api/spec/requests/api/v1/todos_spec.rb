require 'rails_helper'

RSpec.describe 'Api::V1::Todos', type: :request do
  let(:user) { create(:user) }
  let(:token) { JsonWebToken.encode(user_id: user.id) }
  let(:headers) { { 'Authorization' => "Bearer #{token}" } }

  describe 'GET /api/v1/todos' do
    let!(:todos) { create_list(:todo, 3, user: user) }
    let!(:other_user_todo) { create(:todo) }

    it 'returns user todos' do
      get '/api/v1/todos', headers: headers
      expect(response).to have_http_status(:ok)
      expect(response.parsed_body.size).to eq(3)
    end

    it 'does not return other users todos' do
      get '/api/v1/todos', headers: headers
      todo_ids = response.parsed_body.pluck('id')
      expect(todo_ids).not_to include(other_user_todo.id)
    end

    it 'requires authentication' do
      get '/api/v1/todos'
      expect(response).to have_http_status(:unauthorized)
    end
  end

  describe 'GET /api/v1/todos/:id' do
    let(:todo) { create(:todo, user: user) }

    it 'returns the todo' do
      get "/api/v1/todos/#{todo.id}", headers: headers
      expect(response).to have_http_status(:ok)
      expect(response.parsed_body['id']).to eq(todo.id)
    end

    it 'returns 404 for non-existent todo' do
      get '/api/v1/todos/999999', headers: headers
      expect(response).to have_http_status(:not_found)
    end

    it 'returns 404 for other users todo' do
      other_todo = create(:todo)
      get "/api/v1/todos/#{other_todo.id}", headers: headers
      expect(response).to have_http_status(:not_found)
    end
  end

  describe 'POST /api/v1/todos' do
    let(:valid_attributes) do
      {
        todo: {
          title: 'Test TODO',
          due_date: Time.zone.today,
          priority: 2
        }
      }
    end

    let(:invalid_attributes) do
      {
        todo: {
          title: '',
          priority: 5
        }
      }
    end

    it 'creates a new todo' do
      expect do
        post '/api/v1/todos', params: valid_attributes, headers: headers, as: :json
      end.to change(Todo, :count).by(1)
    end

    it 'returns created status' do
      post '/api/v1/todos', params: valid_attributes, headers: headers, as: :json
      expect(response).to have_http_status(:created)
    end

    it 'returns unprocessable_entity for invalid params' do
      post '/api/v1/todos', params: invalid_attributes, headers: headers, as: :json
      expect(response).to have_http_status(:unprocessable_entity)
    end
  end

  describe 'PUT /api/v1/todos/:id' do
    let(:todo) { create(:todo, user: user, title: 'Original') }
    let(:valid_attributes) { { todo: { title: 'Updated' } } }

    it 'updates the todo' do
      put "/api/v1/todos/#{todo.id}", params: valid_attributes, headers: headers, as: :json
      todo.reload
      expect(todo.title).to eq('Updated')
    end

    it 'returns success status' do
      put "/api/v1/todos/#{todo.id}", params: valid_attributes, headers: headers, as: :json
      expect(response).to have_http_status(:ok)
    end

    it 'returns 404 for other users todo' do
      other_todo = create(:todo)
      put "/api/v1/todos/#{other_todo.id}", params: valid_attributes, headers: headers, as: :json
      expect(response).to have_http_status(:not_found)
    end
  end

  describe 'DELETE /api/v1/todos/:id' do
    let!(:todo) { create(:todo, user: user) }

    it 'deletes the todo' do
      expect do
        delete "/api/v1/todos/#{todo.id}", headers: headers
      end.to change(Todo, :count).by(-1)
    end

    it 'returns no_content status' do
      delete "/api/v1/todos/#{todo.id}", headers: headers
      expect(response).to have_http_status(:no_content)
    end

    it 'returns 404 for other users todo' do
      other_todo = create(:todo)
      delete "/api/v1/todos/#{other_todo.id}", headers: headers
      expect(response).to have_http_status(:not_found)
    end
  end
end
