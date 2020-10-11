class CoursesController < ApplicationController
  def index
    @courses = Course.all
    @courses = Queries::Paginate.call(params, @courses)
  end
end
