import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchDevice } from '../../actions/things/device-actions'
import { setBreadcrumbs } from '../../actions/page-actions'
import clearDownloadURL from '../../actions/connectors/clearDownloadURL'
import DownloadLayout from '../../components/DownloadLayout'
import PageLayout from '../page-layout'

class Generated extends Component {
  componentWillMount() {
    this.props.dispatch(clearDownloadURL())
    this.props.dispatch(setBreadcrumbs([
      {
        label: 'Connectors',
        link: '/',
      },
      {
        label: 'My Connectors',
        link: '/connectors/my',
      },
      {
        label: 'Download',
      },
    ]))
  }

  render(){
    const { children } = this.props

    return <PageLayout><DownloadLayout>{children}</DownloadLayout></PageLayout>
  }
}

function mapStateToProps({}) {
  return {}
}

export default connect(mapStateToProps)(Generated)
