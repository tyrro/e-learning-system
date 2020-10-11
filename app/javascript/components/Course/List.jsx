import React, { useEffect, useState } from 'react';

import httpClient from '../../shared/httpClient';
import routes from '../../routes';

import Breadcrumb from '../Breadcrumb';
import Pagination from '../Pagination';

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const forcePage = currentPage - 1;

  const fetchCourses = async page => {
    const { data } = await httpClient.get(
      routes.courses.index({
        page,
      }),
    );
    setCourses(data.courses);
    setCurrentPage(data.pagination.currentPage);
    setTotalPages(data.pagination.totalPages);
  };

  const onPageChange = selectedPage => {
    setCurrentPage(selectedPage);
    fetchCourses(selectedPage);
  };

  const onCourseDelete = async courseId => {
    // eslint-disable-next-line no-alert
    if (window.confirm('Are you sure to delete this course')) {
      await httpClient.delete(routes.courses.destroy({ courseId }));
      fetchCourses(currentPage);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className="course-list">
      <div className="course-list__breadcrumb">
        <Breadcrumb currentPath="courses" />
      </div>
      <div className="course-list__pagination text-right align-center">
        <Pagination
          pageCount={totalPages}
          forcePage={forcePage}
          onPageChange={page => onPageChange(page.selected + 1)}
        />
      </div>
      <div className="course-list__contents row">
        {courses.map(course => (
          <div className="col-sm-6" key={course.lessonsPath}>
            <div className="card bg-light">
              <div className="card-body">
                <h5 className="card-title">{course.name}</h5>
                <p className="card-text">{course.description}</p>
                <a href={course.lessonsPath} className="btn btn-primary">
                  Go to Lessons
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="course-list__pagination text-right">
        <Pagination
          pageCount={totalPages}
          forcePage={forcePage}
          onPageChange={page => onPageChange(page.selected + 1)}
        />
      </div>
    </div>
  );
};

export default CourseList;
