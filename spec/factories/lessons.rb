FactoryBot.define do
  factory :lesson do
    name { 'Getting Started with Rails' }
    description do
      'Rails is a web application development framework written in the Ruby programming language. It is
      designed to make programming web applications easier by making assumptions about what every developer
      needs to get started.'
    end
    course
  end
end
