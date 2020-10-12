class QuestionsController < ApplicationController
  before_action :find_lesson, only: %i(index create)

  def index
    @questions = @lesson.questions
    @questions = Queries::Paginate.call(params, @questions)
  end

  private

  def find_lesson
    @lesson = Lesson.find(params[:lesson_id])
  end
end
