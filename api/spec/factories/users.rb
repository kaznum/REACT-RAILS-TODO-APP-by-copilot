FactoryBot.define do
  factory :user do
    email { Faker::Internet.email }
    name { Faker::Name.name }
    provider { 'google_oauth2' }
    uid { Faker::Number.number(digits: 10).to_s }
    image_url { Faker::Internet.url }
  end
end
