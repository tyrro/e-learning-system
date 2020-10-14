require 'rails_helper'

RSpec.describe LessonsController, type: :controller do
  before do
    sign_in
  end

  let(:course) { FactoryBot.create :course }
  let!(:lesson) { FactoryBot.create :lesson, course: course }
  let(:lessons_attributes) do
    {
      id: lesson.id,
      name: lesson.name,
      description: lesson.description,
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
    {
      path: courses_path, label: 'courses',
    }
  end

  describe 'GET #index' do
    describe 'JSON format' do
      render_views

      it 'returns the list of lessons in JSON' do
        get :index, params: { course_id: course.id, format: :json }

        expect(JSON.parse(response.body, symbolize_names: true)).to eq(
          lessons: [lessons_attributes.merge({ questions_path: lesson_questions_path(lesson) })],
          breadcrumbs: [breadcrumb_paths],
          pagination: pagination,
        )
      end
    end
  end

  describe 'POST #create' do
    it 'renders a successful response on create' do
      expect do
        post :create, params: { course_id: course.id, lesson: lessons_attributes.except(:id) }
      end.to change(Lesson, :count).by(1)
      expect(JSON.parse(response.body)).to eq({ 'error' => nil })
    end

    it 'renders the errors if create fails' do
      expect do
        post :create, params: { course_id: course.id, lesson: lessons_attributes.except(:id, :name) }
      end.not_to change(Lesson, :count)
      expect(JSON.parse(response.body)).to eq({ 'error' => { 'name' => 'can\'t be blank' } })
    end
  end

  describe 'PUT #update' do
    let(:update_attributes) do
      { name: 'Introduction to React' }
    end

    it 'renders a successful response on update' do
      put :update, params: { id: lesson.id, lesson: lessons_attributes.except(:id).merge(update_attributes) }
      expect(lesson.reload.name).to eq(update_attributes[:name])
      expect(JSON.parse(response.body)).to eq({ 'error' => nil })
    end

    it 'renders the errors if update fails' do
      post :update, params: { id: lesson.id, lesson: lessons_attributes.except(:id).merge(name: '') }
      expect(JSON.parse(response.body)).to eq({ 'error' => { 'name' => 'can\'t be blank' } })
    end
  end

  describe 'DELETE #destroy' do
    it 'renders a successful message after deletion' do
      expect do
        delete :destroy, params: { id: lesson.id }
      end.to change(Lesson, :count).by(-1)
      expect(JSON.parse(response.body)).to eq({ 'message' => 'Lesson has been removed' })
    end
  end
end
