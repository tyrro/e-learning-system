require 'rails_helper'

RSpec.describe QuestionsController, type: :controller do
  before do
    sign_in
  end

  let(:lesson) { FactoryBot.create :lesson }
  let!(:question) { FactoryBot.create :question, :with_answer, lesson: lesson }
  let(:questions_attributes) do
    {
      id: question.id,
      name: question.name,
    }
  end
  let(:answers_attributes) do
    {
      id: question.answers.first.id,
      name: question.answers.first.name,
      correct: question.answers.first.correct,
    }
  end
  let(:pagination) do
    {
      total_pages: 1,
      total_count: 1,
      current_page: 1,
    }
  end
  let(:breadcrumb_paths) do
    [
      { path: courses_path, label: 'courses' },
      { path: course_lessons_path(lesson.course), label: 'lessons' },
    ]
  end

  describe 'GET #index' do
    describe 'JSON format' do
      render_views

      it 'returns the list of questions in JSON' do
        get :index, params: { lesson_id: lesson.id, format: :json }

        expect(JSON.parse(response.body, symbolize_names: true)).to eq(
          questions: [questions_attributes.merge({ answers: [answers_attributes] })],
          breadcrumbs: breadcrumb_paths,
          pagination: pagination,
        )
      end
    end
  end

  describe 'POST #create' do
    it 'renders a successful response on create' do
      expect do
        post :create, params: {
          lesson_id: lesson.id,
          question: questions_attributes.except(:id).merge(
            answers_attributes: [answers_attributes.except(:id)],
          ),
        }
      end.to change(Question, :count).by(1)
      expect(JSON.parse(response.body)).to eq({ 'error' => nil })
    end

    it 'renders the errors if create fails' do
      expect do
        post :create, params: {
          lesson_id: lesson.id,
          question: questions_attributes.except(:id, :name).merge(
            answers_attributes: [answers_attributes.except(:id, :name)],
          ),
        }
      end.not_to change(Question, :count)
      expect(JSON.parse(response.body)).to eq(
        {
          'error' => {
            'name' => 'can\'t be blank',
            'answers.name' => 'answers can\'t be blank',
          },
        },
      )
    end
  end

  describe 'PUT #update' do
    let(:update_attributes) do
      { name: 'Introduction to React' }
    end

    it 'renders a successful response on update' do
      put :update, params:
      {
        id: question.id,
        question: questions_attributes.except(:id).merge(update_attributes).merge(
          answers_attributes: [answers_attributes.except(:id)],
        ),
      }
      expect(question.reload.name).to eq(update_attributes[:name])
      expect(JSON.parse(response.body)).to eq({ 'error' => nil })
    end

    it 'renders the errors if update fails' do
      post :update, params: {
        id: question.id,
        question: questions_attributes.except(:id).merge(name: '').merge(
          answers_attributes: [answers_attributes.except(:id)],
        ),
      }
      expect(JSON.parse(response.body)).to eq({ 'error' => { 'name' => 'can\'t be blank' } })
    end
  end

  describe 'DELETE #destroy' do
    it 'renders a successful message after deletion' do
      expect do
        delete :destroy, params: { id: question.id }
      end.to change(Question, :count).by(-1)
      expect(JSON.parse(response.body)).to eq({ 'message' => 'Question has been removed' })
    end
  end
end
