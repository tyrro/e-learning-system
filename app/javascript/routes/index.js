import urlTemplate from 'url-template';

function url(template, params) {
  const myParams = { ...params };
  if (myParams.format === undefined) {
    myParams.format = 'json';
  }
  return urlTemplate.parse(template).expand(myParams);
}

const routes = {
  courses: {
    index: params => url('/courses{.format}{?page}', params),
    create: params => url('/courses{.format}', params),
    update: params => url('/courses/{courseId}{.format}', params),
    destroy: params => url('/courses/{courseId}{.format}', params),
  },

  lessons: {
    index: params => url('/courses/{courseId}/lessons{.format}{?page}', params),
    create: params => url('/courses/{courseId}/lessons{.format}', params),
    update: params => url('/lessons/{lessonId}{.format}', params),
    destroy: params => url('/lessons/{lessonId}{.format}', params),
  },

  questions: {
    index: params => url('/lessons/{lessonId}/questions{.format}{?page}', params),
    create: params => url('/lessons/{lessonId}/questions{.format}', params),
    update: params => url('/questions/{questionId}{.format}', params),
    destroy: params => url('/questions/{questionId}{.format}', params),
  },
};

export default routes;
