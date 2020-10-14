# E Learning System

This is a sample app where an user can login and take courses right away. User can take part in quizzes and can get results promptly. Course content can only be managed by an admin.

The backend of this project is developed in Rails and the Frontend part in React. To run this project in
the local machine, we have to install both `Rails` and `Node`.

**Setup**

- Clone the repository
  ```bash
  git@github.com:rajibds/e-learning-system.git
  ```
- Homebrew:
  ```bash
  ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
  ```
- rbenv:

  ```bash
  brew install rbenv ruby-build

  # Add rbenv to bash so that it loads every time you open a terminal
  echo 'if which rbenv > /dev/null; then eval "$(rbenv init -)"; fi' >> ~/.bash_profile
  source ~/.bash_profile

  # Install Ruby
  rbenv install 2.6.5
  rbenv global 2.6.5

  # Check if 2.6.5 is installed
  ruby -v
  ```

- PostgreSQL

  ```bash
  brew install postgresql

  # To have launchd start postgresql at login:
  brew services start postgresql
  ```

- nvm

  ```bash
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.36.0/install.sh | bash

  # install node(>10.13.0)
  nvm install 12
  nvm use 12
  ```

- Dependency installation

  ```bash
  gem install bundler
  brew install yarn
  bundle install
  yarn install
  ```

- Database initialization

  ```bash
  rails db:prepare
  ```

- Foreman installation

  ```bash
  gem install foreman
  ```

- Server Start

  ```bash
  foreman s
  ```

  **Managing Content**

  After setting up the project and signing up, a user has to become an admin to manage courses. For an user to become admin:

  ```bash
    rails c
    User.first.update admin: true              // make the first user in the DB admin
    User.find(user_id).update admin: true      // make the user with id: user_id in the DB admin
  ```
