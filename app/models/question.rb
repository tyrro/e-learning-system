class Question < ApplicationRecord
  belongs_to :lesson
  has_many :answers, dependent: :destroy

  accepts_nested_attributes_for :answers

  validates :name, presence: true
  validate :at_least_one_correct_answer

  def at_least_one_correct_answer
    return unless answers.present?
    return unless answers.all? { |answer| !answer.correct }

    errors.add('answers.correct', 'Please choose one correct answer')
  end
end
