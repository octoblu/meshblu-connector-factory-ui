import React, { Component } from 'react';
import { Link } from 'react-router';

import { getDevices } from '../services/device-service';

import {
  Spinner,
  ErrorState,
  Page,
  PageHeader,
  PageTitle
} from 'zooid-ui';

import InstalledDevices from '../components/InstalledDevices';

export default class Installed extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      devices: null,
      error: null,
    }
  }

  componentDidMount() {
    this.setState({ loading: true });

    getDevices((error, devices)=>{
      this.setState({ error, devices, loading: false });
    });
  }

  renderContent(content) {
    return (
      <Page>
        <PageHeader>
          <PageTitle>Installed Devices</PageTitle>
        </PageHeader>
        {content}
      </Page>
    );
  }

  render() {
    const { loading, error, devices } = this.state;

    if (loading) return this.renderContent(<Spinner size="large"/>);
    if (error) return this.renderContent(<ErrorState title={error.message} />);

    return this.renderContent(<InstalledDevices devices={devices} />);
  }
}
