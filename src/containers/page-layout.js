import _ from 'lodash'
import React, { PropTypes, Component } from 'react'
import OctobluOauth from './octoblu-oauth'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import ErrorState from 'zooid-error-state'
import {
  Spinner,
  Breadcrumb,
  TopBar,
  Page,
  PageHeader,
  PageActions,
  PageTitle,
  DeviceIcon,
} from 'zooid-ui'

import '../styles/page-layout.css'

const propTypes = {
  title: PropTypes.string,
  actions: PropTypes.element,
  type: PropTypes.string,
}

const defaultProps = {
  actions: null,
}

class PageLayout extends Component {
  getActions() {
    const { actions } = this.props
    if (_.isEmpty(actions)) {
      return null
    }
    return (
      <PageActions className="PageLayout--Actions">
        {actions}
      </PageActions>
    )
  }

  getIcon() {
    const { type } = this.props
    if (!type) return null
    return <DeviceIcon className="ConnectorIcon PageLayout--Icon" type={type} />
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
          <OctobluOauth>
            {content}
          </OctobluOauth>
        </Page>
      </div>
    )
  }

  render() {
    const { children, fetchingCount, error } = this.props

    if (fetchingCount > 0) {
      return this.renderPage(<Spinner size="large" />)
    }

    if (error) {
      const message = _.isString(error) ? error : error.message
      return this.renderPage(<ErrorState title={message} />)
    }

    if (!children) {
      return this.renderPage(<div></div>)
    }

    return this.renderPage(children)
  }
}

PageLayout.propTypes = propTypes
PageLayout.defaultProps = defaultProps

function mapStateToProps({ page }) {
  const { fetchingCount, error, fragments } = page
  return { fetchingCount, error, fragments }
}

export default connect(mapStateToProps)(PageLayout)
