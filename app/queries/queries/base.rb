module Queries
  class Base
    def initialize(params:, relation:)
      @params = params
      @relation = relation
    end

    def self.call(params, relation)
      new(params: params, relation: relation).call
    end
  end
end
