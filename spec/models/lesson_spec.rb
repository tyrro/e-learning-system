require 'rails_helper'

RSpec.describe Lesson, type: :model do
  it { is_expected.to belong_to(:course) }
  it { is_expected.to have_many(:questions).dependent(:destroy) }
  it { is_expected.to validate_presence_of(:name) }
  it { is_expected.to accept_nested_attributes_for(:questions) }
end
