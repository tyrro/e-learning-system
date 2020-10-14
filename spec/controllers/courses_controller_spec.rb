require 'rails_helper'

RSpec.describe CoursesController, type: :controller do
  before do
    sign_in
  end

  let!(:course) { FactoryBot.create :course }
  let(:course_attributes) do
    {
      id: course.id,
      name: course.name,
      description: course.description,
    }
  end
  let(:pagination) do
    {
      total_pages: 1,
      total_count: 1,
      current_page: 1,
    }
  end

  describe 'GET #index' do
    describe 'JSON format' do
      render_views

      it 'returns the list of courses in JSON' do
        get :index, params: { format: :json }

        expect(JSON.parse(response.body, symbolize_names: true)).to eq(
          courses: [course_attributes.merge({ lessons_path: course_lessons_path(course) })],
          pagination: pagination,
        )
      end
    end
  end

  describe 'POST #create' do
    it 'renders a successful response on create' do
      expect do
        post :create, params: { course: course_attributes.except(:id) }
      end.to change(Course, :count).by(1)
      expect(JSON.parse(response.body)).to eq({ 'error' => nil })
    end

    it 'renders the errors if create fails' do
      expect do
        post :create, params: { course: course_attributes.except(:id, :name) }
      end.not_to change(Course, :count)
      expect(JSON.parse(response.body)).to eq({ 'error' => { 'name' => 'can\'t be blank' } })
    end
  end

  describe 'PUT #update' do
    let(:update_attributes) do
      { name: 'Introduction to React' }
    end

    it 'renders a successful response on update' do
      put :update, params: { id: course.id, course: course_attributes.except(:id).merge(update_attributes) }
      expect(course.reload.name).to eq(update_attributes[:name])
      expect(JSON.parse(response.body)).to eq({ 'error' => nil })
    end

    it 'renders the errors if update fails' do
      post :update, params: { id: course.id, course: course_attributes.except(:id).merge(name: '') }
      expect(JSON.parse(response.body)).to eq({ 'error' => { 'name' => 'can\'t be blank' } })
    end
  end

  describe 'DELETE #destroy' do
    it 'renders a successful message after deletion' do
      expect do
        delete :destroy, params: { id: course.id }
      end.to change(Course, :count).by(-1)
      expect(JSON.parse(response.body)).to eq({ 'message' => 'Course has been removed' })
    end
  end
end
