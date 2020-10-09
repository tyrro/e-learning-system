module Queries
  class Paginate < Queries::Base
    def call
      @relation.page(@params[:page]).per(@params[:per_page] || 10)
    end
  end
end
