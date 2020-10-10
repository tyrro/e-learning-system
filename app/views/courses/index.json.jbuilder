json.courses @courses do |course|
  json.id course.id
  json.name course.name
  json.description course.description
  json.lessons_path course_lessons_path(course)
end

json.pagination do
  json.partial! 'paginations/pagination', locals: { collection: @courses }
end
