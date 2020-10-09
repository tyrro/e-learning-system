require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module ELearningSystem
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 6.0

    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration can go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded after loading
    # the framework and any gems in your application.

    STDOUT.sync = true
    config.log_tags = {
      request_id: :request_id,
      remote_ip: :remote_ip,
      subdomain: :subdomain,
    }
    # Semantic Logger defaults
    config.semantic_logger.application = 'ELearningSystem'
    config.rails_semantic_logger.format = :json
    config.rails_semantic_logger.add_file_appender = false

    config.semantic_logger.add_appender(file_name: "log/#{Rails.env}.json", formatter: :json)
  end
end
