class Course < ApplicationRecord
  has_many :lessons
  accepts_nested_attributes_for :lessons
end
