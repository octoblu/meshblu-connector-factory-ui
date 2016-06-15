import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

class ShortList extends Component {
  render() {
    const { title, children, linkTo, emptyState, showEmptyState } = this.props;
    if (showEmptyState) {
      return emptyState
    }
    return (
      <div>
        <h3>{title}</h3>
        {children}
        <footer className="ActionFooter">
          <Link className="ActionButton Button Button--no-style" to={linkTo}>See More</Link>
        </footer>
      </div>
    );
  }
}

ShortList.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
  linkTo: PropTypes.string.isRequired,
  emptyState: PropTypes.element,
  showEmptyState: PropTypes.bool,
}

ShortList.defaultProps = {
  showEmptyState: false,
}

export default ShortList
