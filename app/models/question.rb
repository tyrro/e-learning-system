class Question < ApplicationRecord
  belongs_to :lesson
  has_many :answers, dependent: :destroy

  accepts_nested_attributes_for :answers,
                                reject_if: proc { |attrs| attrs[:name].blank? }

  validates :name, presence: true
end
