class CreateAnswers < ActiveRecord::Migration[6.0]
  def change
    create_table :answers do |t|
      t.string :name
      t.boolean :correct, default: false, null: false
      t.references :question, foreign_key: true, index: true, null: false
    end
  end
end
