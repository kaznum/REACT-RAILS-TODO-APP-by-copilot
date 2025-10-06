require 'rails_helper'

RSpec.describe 'Api::V1::Users', type: :request do
  let(:user) { create(:user) }
  let(:token) { JsonWebToken.encode(user_id: user.id) }
  let(:headers) { { 'Authorization' => "Bearer #{token}" } }

  describe 'GET /api/v1/current_user' do
    it 'returns current user' do
      get '/api/v1/current_user', headers: headers
      expect(response).to have_http_status(:ok)

      json = response.parsed_body
      expect(json['id']).to eq(user.id)
      expect(json['email']).to eq(user.email)
      expect(json['name']).to eq(user.name)
    end

    it 'requires authentication' do
      get '/api/v1/current_user'
      expect(response).to have_http_status(:unauthorized)
    end
  end
end
