/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import requiredIf from 'react-required-if';

import httpClient from '../../shared/httpClient';
import routes from '../../routes';

const CourseModal = ({ actionName, initialCourseAttributes, fetchCourses }) => {
  const courseId = initialCourseAttributes.id;
  const [name, setName] = useState(initialCourseAttributes.name);
  const [description, setDescription] = useState(initialCourseAttributes.description);
  const [errors, setErrors] = useState({});

  const resetForm = () => {
    setName('');
    setDescription('');
    setErrors({});
  };

  const handleSubmitForm = async event => {
    event.preventDefault();

    const courseParams = { name, description };

    const requestRoute =
      actionName === 'update'
        ? httpClient.put(routes.courses.update({ courseId }), courseParams)
        : httpClient.post(routes.courses.create(), courseParams);

    try {
      const { data } = await requestRoute;

      if (data.error === null) {
        if (actionName === 'create') {
          resetForm();
        }
        fetchCourses();
      }
    } catch (error) {
      const response = error.response;
      if (response && response.status === 422) {
        setErrors(response.data.error);
      }
    }
  };

  return (
    <div className="course-modal ml-auto">
      <button
        type="button"
        className="btn btn-sm btn-primary"
        data-toggle="modal"
        data-target={`#courseModal-${actionName}-${courseId}`}
      >
        {actionName === 'update' ? 'Edit Course' : 'Add New'}
      </button>
      <div
        className="modal fade"
        id={`courseModal-${actionName}-${courseId}`}
        tabIndex="-1"
        role="dialog"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
          <div className="modal-content">
            <form
              onSubmit={event => {
                handleSubmitForm(event);
              }}
            >
              <div className="modal-header">
                <h5 className="modal-title" id="courseModalTitle">
                  {actionName === 'update' ? 'Edit Course' : 'Add New Course'}
                </h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="container-fluid">
                  <div className="form-group">
                    <label htmlFor="name">{I18n.t('attributes.course.name')}</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      value={name}
                      placeholder="Add name"
                      onChange={event => setName(event.target.value)}
                    />
                    {errors.name && (
                      <small id="nameHelp" className="form-text text-danger">
                        {errors.name}
                      </small>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="description">{I18n.t('attributes.course.description')}</label>
                    <textarea
                      className="form-control"
                      id="description"
                      value={description}
                      placeholder="Add Description"
                      rows="5"
                      onChange={event => setDescription(event.target.value)}
                    />
                    {errors.description && (
                      <small id="descriptionHelp" className="form-text text-danger">
                        {errors.description}
                      </small>
                    )}
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">
                  Close
                </button>
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

CourseModal.defaultProps = {
  actionName: 'create',
  initialCourseAttributes: {
    id: null,
    name: '',
    description: '',
  },
};

CourseModal.propTypes = {
  actionName: PropTypes.oneOf(['create', 'update']),
  initialCourseAttributes: PropTypes.shape({
    id: requiredIf(PropTypes.number, props => props.actionName === 'update'),
    name: PropTypes.string,
    description: PropTypes.string,
  }),
  fetchCourses: PropTypes.func.isRequired,
};

export default CourseModal;
