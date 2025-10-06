class Todo < ApplicationRecord
  belongs_to :user

  validates :title, presence: true, length: { maximum: 255 }
  validates :priority, inclusion: { in: [0, 1, 2] }

  # デフォルト値
  attribute :priority, :integer, default: 1
  attribute :completed, :boolean, default: false

  # 優先度の降順、期限の昇順で表示（期限なしは最初に表示）
  scope :sorted, lambda {
    order(priority: :desc, Arel.sql('CASE WHEN due_date IS NULL THEN 0 ELSE 1 END') => :asc, due_date: :asc)
  }

  def overdue?
    !completed && due_date.present? && due_date < Time.zone.today
  end

  def due_today?
    !completed && due_date == Time.zone.today
  end
end
