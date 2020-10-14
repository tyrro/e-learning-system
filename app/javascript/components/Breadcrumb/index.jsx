import React from 'react';
import PropTypes from 'prop-types';

const Breadcrumb = ({ breadcrumbs, currentPath, children }) => {
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        {breadcrumbs.map(path => (
          <li className="breadcrumb-item text-capitalize" key={path.label}>
            <a href={path.path}>{path.label}</a>
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
  breadcrumbs: [],
  children: null,
};

Breadcrumb.propTypes = {
  breadcrumbs: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string,
      label: PropTypes.string,
    }),
  ),
  currentPath: PropTypes.string.isRequired,
  children: PropTypes.node,
};

export default Breadcrumb;
