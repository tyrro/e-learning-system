import urlTemplate from 'url-template';

function url(template, params) {
  const myParams = { ...params };
  if (myParams.format === undefined) {
    myParams.format = 'json';
  }
  return urlTemplate.parse(template).expand(myParams);
}

const routes = {
  cars: {
    index: params => url('/cars{.format}{?q,page}', params),
    update: params => url('/cars/{carId}{.format}', params),
    destroy: params => url('/cars/{carId}{.format}', params),
  },
};

export default routes;
