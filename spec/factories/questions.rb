FactoryBot.define do
  factory :question do
    name { 'What is Rails?' }

    transient do
      correct { false }
    end

    trait :with_answer do
      after(:build) do |question, evaluator|
        answer_attributes = FactoryBot.attributes_for(
          :answer,
          correct: true,
        )

        answer_attributes[:name] = evaluator.name if evaluator.name.present?
        answer_attributes[:correct] = evaluator.correct if evaluator.correct.present?

        question.answers.build answer_attributes
      end
    end
  end
end
