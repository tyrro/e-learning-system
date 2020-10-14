class CreateLessons < ActiveRecord::Migration[6.0]
  def change
    create_table :lessons do |t|
      t.string :name, null: false
      t.text :description
      t.references :course, foreign_key: true, index: true, null: false
    end
  end
end
