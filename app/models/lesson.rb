class Lesson < ApplicationRecord
  belongs_to :course
  has_many :questions, dependent: :destroy

  accepts_nested_attributes_for :questions
end
