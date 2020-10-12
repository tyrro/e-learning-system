import React from 'react';
import PropTypes from 'prop-types';

const Breadcrumb = ({ prevPaths, currentPath, children }) => {
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        {prevPaths.map(path => (
          <li className="breadcrumb-item text-capitalize" key={path.name}>
            <a href={path.path}>{path.name}</a>
          </li>
        ))}
        <li className="breadcrumb-item active text-capitalize mr-5" aria-current="page">
          {currentPath}
        </li>
        {children}
      </ol>
    </nav>
  );
};

Breadcrumb.defaultProps = {
  prevPaths: [],
  children: null,
};

Breadcrumb.propTypes = {
  prevPaths: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string,
      name: PropTypes.string,
    }),
  ),
  currentPath: PropTypes.string.isRequired,
  children: PropTypes.node,
};

export default Breadcrumb;
