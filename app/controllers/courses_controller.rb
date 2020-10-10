class CoursesController < ApplicationController
  before_action :require_login

  def index
    @courses = Course.all
    @courses = Queries::Paginate.call(params, @courses)
  end
end
