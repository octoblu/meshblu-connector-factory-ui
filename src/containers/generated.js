import React, { Component } from 'react';
import {
  Page,
  PageHeader,
  PageTitle,
} from 'zooid-ui';

import '../styles/generated.css';

import Download from '../components/Download';
import ConfigureCard from '../components/ConfigureCard';

export default class Create extends Component {
  constructor(props) {
    super(props)
    this.state = {
      downloaded: false
    }
    this.onDownload = this.onDownload.bind(this);
  }

  onDownload() {
    this.setState({ downloaded: true })
  }

  renderContent(content) {
    return (
      <Page>
        <PageHeader>
          <PageTitle>Connector Created!</PageTitle>
        </PageHeader>
        {content}
      </Page>
    );
  }

  render() {
    const { uuid, key } = this.props.params;
    const { downloaded } = this.state;

    let nextStep = null
    if(downloaded) {
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
          <Download otp={key} onDownload={this.onDownload}/>
        </div>
        {nextStep}
      </div>
    );
  }
}
