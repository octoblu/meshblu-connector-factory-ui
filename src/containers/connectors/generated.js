import React, { Component } from 'react';
import PageLayout from '../page-layout';
import { setBreadcrumbs } from '../../actions/page-actions'

import {
  Button,
} from 'zooid-ui';

import '../../styles/generated.css';

import Download from '../../components/Download';
import ConfigureCard from '../../components/ConfigureCard';
import OrLine from '../../components/OrLine';

export default class Create extends Component {
  constructor(props) {
    super(props)
    this.state = {
      downloaded: false,
    }
    this.onDownload = this.onDownload.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(setBreadcrumbs([
      {
        label: 'Home',
        link: '/',
      },
      {
        label: 'My Things',
        link: '/things/my',
      },
      {
        label: 'Generated',
      },
    ]))
  }

  onDownload() {
    this.setState({ downloaded: true })
  }

  renderContent(content) {
    return (
      <PageLayout>
        {content}
      </PageLayout>
    );
  }

  render() {
    const { uuid, key } = this.props.params;
    const { downloaded } = this.state;

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
          <h2>Download The Installer</h2>
          <Download otp={key} onDownload={this.onDownload} />
          <div className="Generated--key-section">
            <OrLine />
            <div className="Generated--key-content">
              <h3>Use the One Time Password</h3>
              <h3><code>{key}</code></h3>
              <p>* Paste key into an existing installer *</p>
              <Button onClick={this.onDownload} kind="no-style">Next Step</Button>
            </div>
          </div>
        </div>
        {nextStep}
      </div>
    );
  }
}
