class CreateQuestions < ActiveRecord::Migration[6.0]
  def change
    create_table :questions do |t|
      t.string :name
      t.references :lesson, foreign_key: true, index: true, null: false
    end
  end
end
