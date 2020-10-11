import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import httpClient from '../../shared/httpClient';
import routes from '../../routes';

import Breadcrumb from '../Breadcrumb';
import Pagination from '../Pagination';

const LessonList = ({ courseId }) => {
  const [lessons, setLessons] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [prevPaths, setPrevPaths] = useState([]);

  const forcePage = currentPage - 1;

  const fetchLessons = async page => {
    const { data } = await httpClient.get(
      routes.lessons.index({
        courseId,
        page,
      }),
    );
    setLessons(data.lessons);
    setCurrentPage(data.pagination.currentPage);
    setTotalPages(data.pagination.totalPages);
    setPrevPaths(Object.values(data.prevPaths));
  };

  const onPageChange = selectedPage => {
    setCurrentPage(selectedPage);
    fetchLessons(selectedPage);
  };

  const onLessonDelete = async lessonId => {
    // eslint-disable-next-line no-alert
    if (window.confirm('Are you sure to delete this lesson')) {
      await httpClient.delete(routes.lessons.destroy({ lessonId }));
      fetchLessons(currentPage);
    }
  };

  useEffect(() => {
    fetchLessons();
  }, []);

  return (
    <div className="lesson-list">
      <div className="lesson-list__breadcrumb">
        <Breadcrumb prevPaths={prevPaths} currentPath="lessons" />
      </div>
      <div className="lesson-list__pagination text-right align-center">
        <Pagination
          pageCount={totalPages}
          forcePage={forcePage}
          onPageChange={page => onPageChange(page.selected + 1)}
        />
      </div>
      <div className="lesson-list__contents row">
        {lessons.map(lesson => (
          <div className="col-sm-6" key={lesson.questionsPath}>
            <div className="card bg-light">
              <div className="card-body">
                <h5 className="card-title">{lesson.name}</h5>
                <p className="card-text">{lesson.description}</p>
                <a href={lesson.questionsPath} className="btn btn-primary">
                  Go to Lessons
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="lesson-list__pagination text-right">
        <Pagination
          pageCount={totalPages}
          forcePage={forcePage}
          onPageChange={page => onPageChange(page.selected + 1)}
        />
      </div>
    </div>
  );
};

export default LessonList;

LessonList.propTypes = {
  courseId: PropTypes.number.isRequired,
};
