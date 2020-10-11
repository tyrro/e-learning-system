class LessonsController < ApplicationController
  before_action :find_course, only: %i(index create)

  def index
    @lessons = @course.lessons
    @lessons = Queries::Paginate.call(params, @lessons)
  end

  private

  def find_course
    @course = Course.find(params[:course_id])
  end
end
