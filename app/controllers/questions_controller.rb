class QuestionsController < ApplicationController
  include ValidationMessages

  before_action :find_lesson, only: %i(index create)
  before_action :find_question, only: %i(update destroy)

  def index
    @questions = @lesson.questions
    @questions = Queries::Paginate.call(params, @questions)
  end

  def create
    @question = @lesson.questions.new(question_params)
    if @question.save
      render json: { error: nil }
    else
      render json: { error: validation_messages(@question.errors.messages) },
             status: :unprocessable_entity
    end
  end

  def update
    if @question.update(question_params)
      render json: { error: nil }
    else
      render json: { error: validation_messages(@question.errors.messages) },
             status: :unprocessable_entity
    end
  end

  def destroy
    @question.destroy!
    render json: { message: t('action.destroyed', resource: @question.model_name.human) }
  end

  private

  def find_lesson
    @lesson = Lesson.find(params[:lesson_id])
  end

  def find_question
    @question = Question.find(params[:id])
  end

  def question_params
    params.require(:question).permit(:name, answers_attributes: %i(id name correct))
  end
end
