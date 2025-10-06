FactoryBot.define do
  factory :todo do
    title { Faker::Lorem.sentence }
    due_date { Faker::Date.forward(days: 7) }
    completed { false }
    priority { 1 }
    association :user
  end
end
