import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import httpClient from '../../shared/httpClient';
import routes from '../../routes';

import QuestionModal from './Modal';
import Breadcrumb from '../Breadcrumb';
import Pagination from '../Pagination';

const QuestionList = ({ isUserAdmin, lessonId }) => {
  const [questions, setQuestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [breadcrumbs, setBreadcrumbs] = useState([]);

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [userChosenOptions, setUserChosenOptions] = useState([]);

  const forcePage = currentPage - 1;

  const fetchQuestions = async page => {
    const { data } = await httpClient.get(
      routes.questions.index({
        lessonId,
        page,
      }),
    );
    setQuestions(data.questions);
    setCurrentPage(data.pagination.currentPage);
    setTotalPages(data.pagination.totalPages);
    setBreadcrumbs(data.breadcrumbs);
  };

  const findCorrectAnswer = question => question.answers.find(answer => answer.correct);

  const userChoseThisOption = (questionId, answerId) =>
    userChosenOptions.some(
      option => option.questionId === questionId && option.answerId === answerId,
    );

  const onChoosingOption = (questionId, answerId) => {
    setUserChosenOptions(prevOptions => {
      const newOptions = prevOptions.slice();
      const existingQuestionIndex = newOptions.findIndex(
        option => option.questionId === questionId,
      );

      if (existingQuestionIndex !== -1) {
        newOptions.splice(existingQuestionIndex, 1);
      }
      return [...newOptions, { questionId, answerId }];
    });
  };

  const onPageChange = selectedPage => {
    setCurrentPage(selectedPage);
    fetchQuestions(selectedPage);
  };

  const onQuestionDelete = async questionId => {
    // eslint-disable-next-line no-alert
    if (window.confirm('Are you sure to delete this qustion')) {
      await httpClient.delete(routes.questions.destroy({ questionId }));
      fetchQuestions(currentPage);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  return (
    <div className="question-list">
      <div className="question-list__breadcrumb">
        <Breadcrumb breadcrumbs={breadcrumbs} currentPath="questions">
          {isUserAdmin && (
            <QuestionModal
              actionName="create"
              lessonId={lessonId}
              fetchQuestions={fetchQuestions}
            />
          )}
        </Breadcrumb>
      </div>
      <div className="question-list__pagination text-right align-center">
        <Pagination
          pageCount={totalPages}
          forcePage={forcePage}
          onPageChange={page => onPageChange(page.selected + 1)}
        />
      </div>
      <div className="form-group row">
        {questions.map(question => (
          <div className="col-sm-6" key={question.id}>
            <div className="card bg-light">
              <div className="card-body">
                {isUserAdmin && (
                  <button
                    type="button"
                    className="close"
                    aria-label="Close"
                    onClick={() => onQuestionDelete(question.id)}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                )}
                <h5 className="card-title">{question.name}</h5>
                <div className="card-text mb-3">
                  {question.answers.map(answer => (
                    <div className="form-check" key={answer.id}>
                      <input
                        className="form-check-input"
                        type="radio"
                        id={answer.id}
                        checked={userChoseThisOption(question.id, answer.id)}
                        onChange={() => onChoosingOption(question.id, answer.id)}
                      />
                      <label
                        className={classNames(
                          'form-check-label',
                          {
                            'border border-success text-success':
                              formSubmitted && findCorrectAnswer(question) === answer,
                          },
                          {
                            'border border-danger text-danger':
                              formSubmitted &&
                              userChoseThisOption(question.id, answer.id) &&
                              findCorrectAnswer(question) !== answer,
                          },
                        )}
                        htmlFor={answer.id}
                      >
                        {answer.name}
                      </label>
                    </div>
                  ))}
                </div>
                {isUserAdmin && (
                  <QuestionModal
                    actionName="update"
                    initialQuestionAttributes={question}
                    fetchQuestions={fetchQuestions}
                  />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {!formSubmitted && !questions.length && (
        <button
          type="submit"
          className="btn btn-primary btn-sm"
          onClick={() => setFormSubmitted(true)}
        >
          Submit
        </button>
      )}
      {formSubmitted && !questions.length && (
        <button
          type="submit"
          className="btn btn-primary btn-sm"
          onClick={() => {
            setFormSubmitted(false);
            setUserChosenOptions([]);
          }}
        >
          Reset
        </button>
      )}
      <div className="question-list__pagination text-right">
        <Pagination
          pageCount={totalPages}
          forcePage={forcePage}
          onPageChange={page => onPageChange(page.selected + 1)}
        />
      </div>
    </div>
  );
};

QuestionList.propTypes = {
  isUserAdmin: PropTypes.bool.isRequired,
  lessonId: PropTypes.number.isRequired,
};

export default QuestionList;
