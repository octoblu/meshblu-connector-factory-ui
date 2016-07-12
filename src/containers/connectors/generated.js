import React, { Component } from 'react'
import { connect } from 'react-redux'
import PageLayout from '../page-layout'
import { setBreadcrumbs } from '../../actions/page-actions'

import {
  Button,
} from 'zooid-ui'

import '../../styles/generated.css'
import { fetchDevice } from '../../actions/things/device-actions'

import Download from '../../components/Download'
import ConfigureCard from '../../components/ConfigureCard'
import OrLine from '../../components/OrLine'

class Create extends Component {
  constructor(props) {
    super(props)
    this.state = {
      downloaded: false,
    }
    this.onDownload = this.onDownload.bind(this)
  }

  componentDidMount() {
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
    const { uuid } = this.props.params
    this.props.dispatch(fetchDevice({ uuid }))
  }

  onDownload() {
    this.setState({ downloaded: true })
  }

  renderContent(content) {
    return (
      <PageLayout>
        <h1 className="CenterTitle">Download Installer</h1>
        {content}
      </PageLayout>
    )
  }

  render() {
    const { uuid, key } = this.props.params
    const { downloaded } = this.state
    const { selectedVersion } = this.props.details

    let nextStep = null
    if (downloaded) {
      nextStep = (
        <div className="Generated--col">
          <ConfigureCard uuid={uuid} />
        </div>
      )
    }
    return this.renderContent(
      <div className="Generated">
        <div className="Generated--col">
          <Download otp={key} selectedVersion={selectedVersion} onDownload={this.onDownload} />
          <div className="Generated--key-section">
            <OrLine />
            <div className="Generated--key-content">
              <h2>Already have an Installer?</h2>
              <br />
              <h3>Use the One Time Password</h3>
              <h3 className="Generated--code"><code>{key}</code></h3>
              <p>* Paste key into an existing installer *</p>
              <Button onClick={this.onDownload} kind="no-style">Next Step</Button>
            </div>
          </div>
        </div>
        {nextStep}
      </div>
    )
  }
}

function mapStateToProps({ device, details }) {
  return { device, details }
}

export default connect(mapStateToProps)(Create)
