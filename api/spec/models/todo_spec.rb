require 'rails_helper'

RSpec.describe Todo, type: :model do
  describe 'associations' do
    it { is_expected.to belong_to(:user) }
  end

  describe 'validations' do
    it { is_expected.to validate_presence_of(:title) }
    it { is_expected.to validate_length_of(:title).is_at_most(255) }
    it { is_expected.to validate_inclusion_of(:priority).in_array([0, 1, 2]) }
  end

  describe 'default values' do
    it 'sets priority to 1 by default' do
      user = create(:user)
      todo = described_class.new(title: 'Test Todo', user: user)
      todo.save
      expect(todo.priority).to eq(1)
    end

    it 'sets completed to false by default' do
      user = create(:user)
      todo = described_class.new(title: 'Test Todo', user: user)
      todo.save
      expect(todo.completed).to be false
    end
  end

  describe '#overdue?' do
    let(:user) { create(:user) }

    it 'returns true for overdue incomplete todos' do
      todo = create(:todo, user: user, due_date: Date.yesterday, completed: false)
      expect(todo.overdue?).to be true
    end

    it 'returns false for completed todos' do
      todo = create(:todo, user: user, due_date: Date.yesterday, completed: true)
      expect(todo.overdue?).to be false
    end

    it 'returns false for future todos' do
      todo = create(:todo, user: user, due_date: Date.tomorrow, completed: false)
      expect(todo.overdue?).to be false
    end

    it 'returns false for todos without due date' do
      todo = create(:todo, user: user, due_date: nil, completed: false)
      expect(todo.overdue?).to be false
    end
  end

  describe '#due_today?' do
    let(:user) { create(:user) }

    it 'returns true for incomplete todos due today' do
      todo = create(:todo, user: user, due_date: Time.zone.today, completed: false)
      expect(todo.due_today?).to be true
    end

    it 'returns false for completed todos' do
      todo = create(:todo, user: user, due_date: Time.zone.today, completed: true)
      expect(todo.due_today?).to be false
    end

    it 'returns false for todos due on other days' do
      todo = create(:todo, user: user, due_date: Date.tomorrow, completed: false)
      expect(todo.due_today?).to be false
    end
  end

  describe '.sorted' do
    let(:user) { create(:user) }

    it 'orders by priority descending' do
      low = create(:todo, user: user, priority: 0, due_date: Time.zone.today)
      medium = create(:todo, user: user, priority: 1, due_date: Time.zone.today)
      high = create(:todo, user: user, priority: 2, due_date: Time.zone.today)

      expect(described_class.sorted).to eq([high, medium, low])
    end

    it 'orders by due_date ascending within same priority' do
      todo1 = create(:todo, user: user, priority: 1, due_date: Time.zone.today + 2)
      todo2 = create(:todo, user: user, priority: 1, due_date: Time.zone.today + 1)

      expect(described_class.where(priority: 1).sorted).to eq([todo2, todo1])
    end

    it 'places todos without due_date first within same priority' do
      with_date = create(:todo, user: user, priority: 1, due_date: Time.zone.today)
      without_date = create(:todo, user: user, priority: 1, due_date: nil)

      expect(described_class.where(priority: 1).sorted).to eq([without_date, with_date])
    end
  end
end
