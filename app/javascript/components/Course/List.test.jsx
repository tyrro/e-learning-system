import React from 'react';
import axios from 'axios';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';

import CourseList from './List';
import wait from '../../shared/wait';

const props = { isUserAdmin: false };
const courses = [
  {
    id: 1,
    name: 'Introduction to React',
    description: 'React is a JavaScript library ',
    lessons_path: '/courses/1/lessons',
  },
];

const pagination = { total_pages: 1, total_count: 2, current_page: 1 };

describe(CourseList, () => {
  beforeEach(() => {
    axios.onGet(/courses/).reply(200, {
      courses,
      pagination,
    });
  });

  it('fetches courses as soon as component renders', async () => {
    await act(async () => {
      const wrapper = mount(<CourseList {...props} />);
      await wait();
      wrapper.update();

      expect(wrapper.find('div.course-list__contents .card-title').text()).toEqual(courses[0].name);
    });
  });

  describe('Common View', () => {
    it('shows a go to lessons button to go to the next lesson', async () => {
      await act(async () => {
        const wrapper = mount(<CourseList {...props} />);
        await wait();
        wrapper.update();

        expect(wrapper.find('div.course-list__content-links').find('a').prop('href')).toEqual(
          courses[0].lessons_path,
        );
      });
    });
  });

  describe('Admin View', () => {
    const courseModalLinkText = wrapper => wrapper.find('.course-modal .course-modal__link-text');

    it('shows buttons to add and edit course', async () => {
      await act(async () => {
        const wrapper = mount(<CourseList isUserAdmin={true} />);
        await wait();
        wrapper.update();

        expect(wrapper.find('CourseModal').length).toEqual(2); // one each for create and edit course
        expect(courseModalLinkText(wrapper).first().text()).toEqual('Add New');
        expect(courseModalLinkText(wrapper).last().text()).toEqual('Edit Course');
      });
    });
  });

  describe('Non Admin View', () => {
    const courseModalLinkText = wrapper => wrapper.find('.course-modal .course-modal__link-text');

    it('does not show buttons to add and edit course', async () => {
      await act(async () => {
        const wrapper = mount(<CourseList {...props} />);
        await wait();
        wrapper.update();

        expect(wrapper.find('CourseModal').length).toEqual(0);
        expect(courseModalLinkText(wrapper).length).toEqual(0);
      });
    });
  });
});
