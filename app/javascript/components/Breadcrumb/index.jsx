import React from 'react';
import PropTypes from 'prop-types';

const Breadcrumb = ({ prevPaths, currentPath }) => {
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        {prevPaths.map(path => (
          <li className="breadcrumb-item text-capitalize" key={path.name}>
            <a href={path.path}>{path.name}</a>
          </li>
        ))}
        <li className="breadcrumb-item active text-capitalize" aria-current="page">
          {currentPath}
        </li>
      </ol>
    </nav>
  );
};

Breadcrumb.defaultProps = {
  prevPaths: [],
};

Breadcrumb.propTypes = {
  prevPaths: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string,
      name: PropTypes.string,
    }),
  ),
  currentPath: PropTypes.string.isRequired,
};

export default Breadcrumb;
