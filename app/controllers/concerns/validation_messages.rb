module ValidationMessages
  extend ActiveSupport::Concern

  def validation_messages(record_validation_messages)
    record_validation_messages.each_with_object({}) do |(key, value), errors|
      errors[key] = value.to_sentence
    end
  end
end
