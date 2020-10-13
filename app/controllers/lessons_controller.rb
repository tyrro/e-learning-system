class LessonsController < ApplicationController
  include ValidationMessages

  before_action :find_course, only: %i(index create)
  before_action :find_lesson, only: %i(update destroy)

  def index
    @lessons = @course.lessons
    @lessons = Queries::Paginate.call(params, @lessons)
  end

  def create
    @lesson = @course.lessons.new(lesson_params)
    if @lesson.save
      render json: { error: nil }
    else
      render json: { error: validation_messages(@lesson.errors.messages) },
             status: :unprocessable_entity
    end
  end

  def update
    if @lesson.update(lesson_params)
      render json: { error: nil }
    else
      render json: { error: validation_messages(@lesson.errors.messages) },
             status: :unprocessable_entity
    end
  end

  def destroy
    @lesson.destroy!
    render json: { message: t('action.destroyed', resource: @lesson.model_name.human) }
  end

  private

  def find_course
    @course = Course.find(params[:course_id])
  end

  def find_lesson
    @lesson = Lesson.find(params[:id])
  end

  def lesson_params
    params.require(:lesson).permit(:name, :description)
  end
end
