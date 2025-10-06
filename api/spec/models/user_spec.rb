require 'rails_helper'

RSpec.describe User, type: :model do
  describe 'associations' do
    it { should have_many(:todos).dependent(:destroy) }
  end

  describe 'validations' do
    it { should validate_presence_of(:email) }
    it { should validate_presence_of(:provider) }
    it { should validate_presence_of(:uid) }
    
    it 'validates uniqueness of email' do
      create(:user, email: 'test@example.com')
      should validate_uniqueness_of(:email)
    end
  end

  describe '.from_omniauth' do
    let(:auth) do
      OmniAuth::AuthHash.new(
        provider: 'google_oauth2',
        uid: '123456',
        info: {
          email: 'test@example.com',
          name: 'Test User',
          image: 'http://example.com/image.jpg'
        }
      )
    end

    context 'when user does not exist' do
      it 'creates a new user' do
        expect { User.from_omniauth(auth) }.to change(User, :count).by(1)
      end

      it 'sets user attributes correctly' do
        user = User.from_omniauth(auth)
        expect(user.email).to eq('test@example.com')
        expect(user.name).to eq('Test User')
        expect(user.image_url).to eq('http://example.com/image.jpg')
        expect(user.provider).to eq('google_oauth2')
        expect(user.uid).to eq('123456')
      end
    end

    context 'when user already exists' do
      before { User.from_omniauth(auth) }

      it 'does not create a new user' do
        expect { User.from_omniauth(auth) }.not_to change(User, :count)
      end

      it 'returns existing user' do
        existing_user = User.from_omniauth(auth)
        user = User.from_omniauth(auth)
        expect(user.id).to eq(existing_user.id)
      end
    end
  end
end
