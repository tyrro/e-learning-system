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
    update: params => url('/courses/{carId}{.format}', params),
    destroy: params => url('/courses/{carId}{.format}', params),
  },
  lessons: {
    index: params => url('/courses/{courseId}/lessons{.format}{?page}', params),
  },
};

export default routes;
