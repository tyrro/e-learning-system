import React from 'react';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';

const Pagination = ({
  pageCount,
  forcePage,
  onPageChange,
  pageRangeDisplayed,
  marginPagesDisplayed,
}) => {
  return (
    <ReactPaginate
      pageCount={pageCount}
      pageRangeDisplayed={pageRangeDisplayed}
      marginPagesDisplayed={marginPagesDisplayed}
      forcePage={forcePage}
      onPageChange={onPageChange}
      containerClassName="paginate__container"
      pageClassName="paginate__list"
      previousClassName="paginate__previous"
      previousLinkClassName="paginate__previous--link"
      nextClassName="paginate__next"
      nextLinkClassName="paginate__next--link"
      breakClassName="paginate__previous"
      activeClassName="paginate__list--active"
      pageLinkClassName="paginate__list--link"
      nextLabel="Next"
      previousLabel="Previous"
    />
  );
};

Pagination.defaultProps = {
  pageRangeDisplayed: 3,
  marginPagesDisplayed: 1,
};

Pagination.propTypes = {
  pageCount: PropTypes.number.isRequired,
  forcePage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  pageRangeDisplayed: PropTypes.number,
  marginPagesDisplayed: PropTypes.number,
};

export default Pagination;
