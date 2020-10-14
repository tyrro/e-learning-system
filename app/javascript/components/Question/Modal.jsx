/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import requiredIf from 'react-required-if';

import httpClient from '../../shared/httpClient';
import routes from '../../routes';

const setUpInitialAnswers = (answers, actionName) => {
  const emptyAnswers = [
    { name: '', correct: false, key: 1 },
    { name: '', correct: false, key: 2 },
    { name: '', correct: false, key: 3 },
    { name: '', correct: false, key: 4 },
  ];

  if (actionName === 'update') {
    return answers;
  }
  return emptyAnswers;
};

const QuestionModal = ({ actionName, lessonId, initialQuestionAttributes, fetchQuestions }) => {
  const questionId = initialQuestionAttributes.id;
  const [name, setName] = useState(initialQuestionAttributes.name);
  const [answers, setAnswers] = useState(
    setUpInitialAnswers(initialQuestionAttributes.answers, actionName),
  );
  const [errors, setErrors] = useState({});

  const resetForm = () => {
    setName('');
    setAnswers(setUpInitialAnswers(initialQuestionAttributes.answers, actionName));
    setErrors({});
  };

  const handleSubmitForm = async event => {
    event.preventDefault();

    const questionParams = { name, answers_attributes: answers };

    const requestRoute =
      actionName === 'update'
        ? httpClient.put(routes.questions.update({ questionId }), questionParams)
        : httpClient.post(routes.questions.create({ lessonId }), questionParams);

    try {
      const { data } = await requestRoute;

      if (data.error === null) {
        if (actionName === 'create') {
          resetForm();
        }
        setErrors({});
        fetchQuestions();
      }
    } catch (error) {
      const response = error.response;
      if (response && response.status === 422) {
        setErrors(response.data.error);
      }
    }
  };

  const handleRadioButtonChange = (index, event) => {
    const checkedValue = event.target.checked;

    setAnswers(prevAnswers => {
      let newAnswers = [...prevAnswers];
      newAnswers = newAnswers.map(answer => {
        return {
          ...answer,
          correct: false,
        };
      });
      newAnswers[index].correct = checkedValue;
      return [...newAnswers];
    });
  };

  const handleAnswerChange = (index, event) => {
    const answer = event.target.value;

    setAnswers(prevAnswers => {
      const newAnswers = [...prevAnswers];
      newAnswers[index].name = answer;
      return [...newAnswers];
    });
  };

  return (
    <div className="question-modal ml-auto">
      <button
        type="button"
        className="btn btn-sm btn-primary"
        data-toggle="modal"
        data-target={`#questionModal-${actionName}-${questionId}`}
      >
        {actionName === 'update' ? 'Edit Question' : 'Add New'}
      </button>
      <div
        className="modal fade"
        id={`questionModal-${actionName}-${questionId}`}
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
                <h5 className="modal-title" id="questionModalTitle">
                  {actionName === 'update' ? 'Edit Question' : 'Add New Question'}
                </h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="container-fluid">
                  <div className="form-group">
                    <label htmlFor="name">{I18n.t('activerecord.attributes.question.name')}</label>
                    <input
                      type="text"
                      className="form-control"
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
                    <label>{I18n.t('activerecord.attributes.question.answers')}</label>
                    {answers.map((answer, index) => (
                      <div className="input-group" key={`${answer.key}-${answer.id}`}>
                        <div className="input-group-prepend">
                          <div className="input-group-text">
                            <input
                              type="radio"
                              checked={answer.correct}
                              onChange={event => handleRadioButtonChange(index, event)}
                            />
                          </div>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          value={answer.name}
                          placeholder={`Option ${index + 1}`}
                          onChange={event => handleAnswerChange(index, event)}
                          aria-label="Text input with radio button"
                        />
                      </div>
                    ))}
                    {errors.answersName && (
                      <small id="nameHelp" className="form-text text-danger">
                        {errors.answersName}
                      </small>
                    )}
                    {errors.answersCorrect && (
                      <small id="nameHelp" className="form-text text-danger">
                        {errors.answersCorrect}
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

QuestionModal.defaultProps = {
  actionName: 'create',
  lessonId: null,
  initialQuestionAttributes: {
    id: null,
    name: '',
    answers: [],
  },
};

QuestionModal.propTypes = {
  actionName: PropTypes.oneOf(['create', 'update']),
  lessonId: requiredIf(PropTypes.number, props => props.actionName === 'create'),
  initialQuestionAttributes: PropTypes.shape({
    id: requiredIf(PropTypes.number, props => props.actionName === 'update'),
    name: PropTypes.string,
    answers: PropTypes.arrayOf(
      PropTypes.shape({
        id: requiredIf(PropTypes.number, props => props.actionName === 'update'),
        name: PropTypes.string,
      }),
    ),
  }),
  fetchQuestions: PropTypes.func.isRequired,
};

export default QuestionModal;
