json.questions @questions do |question|
  json.id question.id
  json.name question.name
  json.answers question.answers do |answer|
    json.id answer.id
    json.name answer.name
    json.correct answer.correct
  end
end

json.prev_paths do
  json.child! { json.partial! 'paths/path', locals: { path: courses_path, name: 'courses' } }
  json.child! { json.partial! 'paths/path', locals: { path: course_lessons_path(@lesson.course), name: 'lessons' }}
end

json.pagination do
  json.partial! 'paginations/pagination', locals: { collection: @questions }
end
