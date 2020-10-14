import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import httpClient from '../../shared/httpClient';
import routes from '../../routes';

import LessonModal from './Modal';
import Breadcrumb from '../Breadcrumb';
import Pagination from '../Pagination';

const LessonList = ({ isUserAdmin, courseId }) => {
  const [lessons, setLessons] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [breadcrumbs, setBreadcrumbs] = useState([]);

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
    setBreadcrumbs(data.breadcrumbs);
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
        <Breadcrumb breadcrumbs={breadcrumbs} currentPath="lessons">
          {isUserAdmin && (
            <LessonModal actionName="create" courseId={courseId} fetchLessons={fetchLessons} />
          )}
        </Breadcrumb>
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
                {isUserAdmin && (
                  <button
                    type="button"
                    className="close"
                    aria-label="Close"
                    onClick={() => onLessonDelete(lesson.id)}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                )}
                <h5 className="card-title">{lesson.name}</h5>
                <p className="card-text">{lesson.description}</p>
                <div className="lesson-list__content-links d-flex">
                  <a href={lesson.questionsPath} className="btn btn-sm btn-primary mr-2">
                    Take the Quiz
                  </a>
                  {isUserAdmin && (
                    <LessonModal
                      actionName="update"
                      initialLessonAttributes={lesson}
                      fetchLessons={fetchLessons}
                    />
                  )}
                </div>
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
  isUserAdmin: PropTypes.bool.isRequired,
  courseId: PropTypes.number.isRequired,
};
