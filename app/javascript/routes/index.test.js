import routes from './index';

describe('routes', () => {
  test('supports the required query params and format', () => {
    expect(routes.courses.index()).toEqual('/courses.json');
    expect(routes.courses.update({ courseId: 1 })).toEqual('/courses/1.json');
  });
});
