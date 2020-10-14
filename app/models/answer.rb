class Answer < ApplicationRecord
  belongs_to :question

  validates :name, presence: { message: 'answers can\'t be blank' }
end
