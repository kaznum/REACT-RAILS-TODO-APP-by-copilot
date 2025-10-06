class CreateTodos < ActiveRecord::Migration[7.1]
  def change
    create_table :todos do |t|
      t.string :title, null: false
      t.date :due_date
      t.boolean :completed, default: false, null: false
      t.integer :priority, default: 1, null: false
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end

    add_index :todos, [:user_id, :priority]
    add_index :todos, [:user_id, :due_date]
  end
end
