json.questions @questions do |question|
  json.id question.id
  json.name question.name
  json.answers question.answers do |answer|
    json.id answer.id
    json.name answer.name
    json.correct answer.correct
  end
end

json.breadcrumbs do
  json.child! { json.partial! 'breadcrumbs/breadcrumb', locals: { path: courses_path, label: 'courses' } }
  json.child! do
    json.partial! 'breadcrumbs/breadcrumb', locals: { path: course_lessons_path(@lesson.course),
                                                      label: 'lessons', }
  end
end

json.pagination do
  json.partial! 'paginations/pagination', locals: { collection: @questions }
end
