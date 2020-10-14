module AuthHelper
  module Controller
    def sign_in
      user ||= FactoryBot.create(:user)
      sign_in_as user
    end
  end
end
