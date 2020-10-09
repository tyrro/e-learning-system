import routes from './index';

describe('routes', () => {
  test('supports the required query params and format', () => {
    expect(routes.cars.index()).toEqual('/cars.json');
    expect(routes.cars.update({ carId: 1 })).toEqual('/cars/1.json');
  });
});
