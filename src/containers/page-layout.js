import React, { PropTypes, Component } from 'react';
import _ from 'lodash';
import {
  Spinner,
  ErrorState,
  Page,
  PageHeader,
  PageActions,
  PageTitle,
  DeviceIcon,
} from 'zooid-ui';

import '../styles/PageLayout.css';

const propTypes = {
  children: PropTypes.element.isRequired,
  title: PropTypes.string,
  actions: PropTypes.array,
  loading: PropTypes.bool,
  type: PropTypes.string,
  error: PropTypes.string
};

const defaultProps = {
  loading: false,
  actions: []
}

export default class PageLayout extends Component {
  getActions() {
    const { actions } = this.props
    if(_.isEmpty(actions)) {
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
    if(!type) return null
    return <DeviceIcon className="ConnectorIcon" type={type} />
  }

  renderPage(content) {
    const { title } = this.props
    return (
      <Page>
        <PageHeader>
          {this.getIcon()}
          <PageTitle>{title}</PageTitle>
          {this.getActions()}
        </PageHeader>
        {content}
      </Page>
    );
  }

  render() {
    const { children, loading, error } = this.props

    if (loading) {
      return this.renderPage(<Spinner size="large"/>)
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
