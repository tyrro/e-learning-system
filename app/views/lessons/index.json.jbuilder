json.lessons @lessons do |lesson|
  json.id lesson.id
  json.name lesson.name
  json.description lesson.description
  json.questions_path lesson_questions_path lesson
end

json.prev_paths do
  json.courses do
    json.path courses_path
    json.name 'courses'
  end
end

json.pagination do
  json.partial! 'paginations/pagination', locals: { collection: @lessons }
end
