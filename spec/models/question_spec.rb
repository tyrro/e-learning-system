require 'rails_helper'

RSpec.describe Question, type: :model do
  it { is_expected.to belong_to(:lesson) }
  it { is_expected.to have_many(:answers).dependent(:destroy) }
  it { is_expected.to validate_presence_of(:name) }
  it { is_expected.to accept_nested_attributes_for(:answers) }
end
