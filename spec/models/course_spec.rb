require 'rails_helper'

RSpec.describe Course, type: :model do
  it { is_expected.to have_many(:lessons).dependent(:destroy) }
  it { is_expected.to validate_presence_of(:name) }
  it { is_expected.to accept_nested_attributes_for(:lessons) }
end
