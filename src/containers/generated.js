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

    return this.renderContent(
      <div className="Generated">
        <div className="Generated--col">
          <h2>Download The Installer</h2>
          <Download otp={key} />
        </div>
        <div className="Generated--col">
          <ConfigureCard uuid={uuid} />
        </div>
      </div>
    );
  }
}
