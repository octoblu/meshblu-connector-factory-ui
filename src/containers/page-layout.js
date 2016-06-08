import _ from 'lodash';
import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router'
import { connect } from 'react-redux';
import {
  Spinner,
  ErrorState,
  Breadcrumb,
  TopBar,
  Page,
  PageHeader,
  PageActions,
  PageTitle,
  DeviceIcon,
} from 'zooid-ui';

import '../styles/page-layout.css';

const propTypes = {
  children: PropTypes.element.isRequired,
  title: PropTypes.string,
  actions: PropTypes.array,
  type: PropTypes.string,
};

const defaultProps = {
  actions: [],
}

class PageLayout extends Component {
  getActions() {
    const { actions } = this.props
    if (_.isEmpty(actions)) {
      return null
    }
    return (
      <PageActions>
        <ul className="PageLayout--Actions">{actions}</ul>
      </PageActions>
    )
  }

  getIcon() {
    const { type } = this.props
    if (!type) return null
    return <DeviceIcon className="ConnectorIcon" type={type} />
  }

  getBreadcrumbs() {
    const { fragments } = this.props
    const convertedFragments = _.map(fragments, (fragment) => {
      if (fragment.link) {
        return {
          component: (<Link to={fragment.link}>{fragment.label}</Link>),
        }
      }
      return fragment
    })
    return (
      <TopBar>
        <Breadcrumb fragments={convertedFragments} />
      </TopBar>
    )
  }

  getTitle() {
    const { title } = this.props
    if (!title) return null
    return <PageTitle>{title}</PageTitle>
  }

  renderPage(content) {
    return (
      <div>
        {this.getBreadcrumbs()}
        <Page className="PageLayout">
          <PageHeader>
            {this.getIcon()}
            {this.getTitle()}
            {this.getActions()}
          </PageHeader>
          {content}
        </Page>
      </div>
    );
  }

  render() {
    const { children, fetching, error } = this.props

    if (fetching) {
      return this.renderPage(<Spinner size="large" />)
    }

    if (error) {
      const message = _.isString(error) ? error : error.message;
      return this.renderPage(<ErrorState title={message} />)
    }

    return this.renderPage(children)
  }
}

PageLayout.propTypes = propTypes;
PageLayout.defaultProps = defaultProps;

function mapStateToProps({ page }) {
  const { fetching, error, fragments } = page
  return { fetching, error, fragments }
}

export default connect(mapStateToProps)(PageLayout)
