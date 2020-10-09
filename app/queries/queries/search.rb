module Queries
  class Search < Queries::Base
    def call
      return @relation unless @params[:q].present?

      @relation.search(@params[:q])
    end
  end
end
