FROM ruby:2.7.1-alpine AS base

RUN apk add --update --no-cache \
  postgresql-dev \
  tzdata \
  nodejs \
  yarn

FROM base AS dependencies

RUN apk add --update --no-cache build-base

COPY Gemfile Gemfile.lock ./

RUN bundle install --jobs=3 --retry=3 --verbose

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile --verbose

# We're back at the base stage
FROM base

# We'll install the app in this directory
WORKDIR /var/www/e-learning-system

# Copy over gems from the dependencies stage
COPY --from=dependencies /usr/local/bundle/ /usr/local/bundle/

# Copy over npm packages from the dependencies stage
COPY --from=dependencies /node_modules/ node_modules/

# Finally, copy over the code
# This is where the .dockerignore file comes into play
COPY . ./
