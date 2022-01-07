# E Learning System

https://e-learn-ing.herokuapp.com/

This is a sample app where an user can login and take courses right away. User can take part in quizzes and can get results promptly. Course content can only be managed by an admin.

The backend of this project is developed in Rails and the Frontend part in React. Following are the instructions to run the project in local machine:

**Setup**

- Clone the repository

  ```bash
  git clone git@github.com:rajibds/e-learning-system.git
  ```

- Run Docker

  ```bash
  docker-compose up --build
  docker-compose run web rails db:setup
  ```

Server is now up and running at: http://localhost:3000

**Managing Content**

After setting up the project and signing up, a user has to become an admin to manage courses. For an user to become admin:

```bash
  rails c
  User.first.update admin: true              // make the first user in the DB admin
  User.find(user_id).update admin: true      // make the user with id: user_id in the DB admin
```
