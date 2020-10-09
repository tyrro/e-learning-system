import React from 'react';
import { mount } from 'enzyme';

import Pagination from './index';

const props = {
  pageCount: 5,
  forcePage: 0,
  onPageChange: jest.fn(),
};

describe(Pagination, () => {
  const wrapper = mount(<Pagination {...props} />);

  it('renders the paginate container', () => {
    expect(wrapper.find('ul.paginate__container').length).toEqual(1);
  });

  it('renders the total number of pages', () => {
    expect(wrapper.find('li.paginate__list').length).toEqual(props.pageCount);
  });

  it('correctly points out the active page', () => {
    expect(wrapper.find('li.paginate__list--active').text()).toEqual(
      (props.forcePage + 1).toString(),
    );
  });
});
