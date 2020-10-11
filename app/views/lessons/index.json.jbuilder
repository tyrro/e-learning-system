json.lessons @lessons do |lesson|
  json.id lesson.id
  json.name lesson.name
  json.description lesson.description
end

json.pagination do
  json.partial! 'paginations/pagination', locals: { collection: @lessons }
end
