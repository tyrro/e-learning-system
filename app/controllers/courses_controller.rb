class CoursesController < ApplicationController
  include ValidationMessages

  before_action :set_course, only: %i(update destroy)

  def index
    @courses = Course.all
    @courses = Queries::Paginate.call(params, @courses)
  end

  def create
    @course = Course.new(course_params)
    if @course.save
      render json: { error: nil }
    else
      render json: { error: validation_messages(@course.errors.messages) },
             status: :unprocessable_entity
    end
  end

  def update
    if @course.update(course_params)
      render json: { error: nil }
    else
      render json: { error: validation_messages(@course.errors.messages) },
             status: :unprocessable_entity
    end
  end

  def destroy
    @course.destroy!
    render json: { message: t('action.destroyed', resource: @course.model_name.human) }
  end

  def set_course
    @course = Course.find(params[:id])
  end

  def course_params
    params.require(:course).permit(:name, :description)
  end
end
