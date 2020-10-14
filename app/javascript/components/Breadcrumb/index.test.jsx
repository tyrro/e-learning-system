import React from 'react';
import { shallow } from 'enzyme';

import Breadcrumb from './index';

const props = {
  breadcrumbs: [
    {
      path: '/courses',
      label: 'courses',
    },
  ],
  currentPath: 'lesson',
};

describe(Breadcrumb, () => {
  const wrapper = shallow(<Breadcrumb {...props} />);
  const breadcrumbItems = wrapper.find('li.breadcrumb-item');

  it('creates a clickable link for all the breadcrumbs except for the current path', () => {
    expect(breadcrumbItems.length).toEqual(2);
    expect(breadcrumbItems.first().find('a').prop('href')).toEqual(props.breadcrumbs[0].path);
    expect(breadcrumbItems.last().find('a').length).toEqual(0);
  });
});
