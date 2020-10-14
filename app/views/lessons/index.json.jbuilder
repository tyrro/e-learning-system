json.lessons @lessons do |lesson|
  json.id lesson.id
  json.name lesson.name
  json.description lesson.description
  json.questions_path lesson_questions_path lesson
end

json.breadcrumbs do
  json.child! { json.partial! 'breadcrumbs/breadcrumb', locals: { path: courses_path, label: 'courses' } }
end

json.pagination do
  json.partial! 'paginations/pagination', locals: { collection: @lessons }
end
