import React, { Component } from 'react';
import { Link } from 'react-router';

import {
  Page,
  PageHeader,
  Spinner,
  ErrorState,
  Button,
} from 'zooid-ui';

import Versions from '../components/Versions';
import VersionInfo from '../components/VersionInfo';
import Download from '../components/Download';

import { connectorDetails } from '../services/connector-detail-service';
import { createConnector } from '../helpers/connector-creator';

export default class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      details: null,
      selectedVersion: null,
      generated: false,
      otp: null,
      uuid: null,
      loading: true,
    };
    this.versionSelect = this.versionSelect.bind(this);
    this.createDevice = this.createDevice.bind(this);
  }

  componentDidMount() {
    const { connector } = this.props.params;
    connectorDetails({ connector }, (error, details) => {
      this.setState({ error, details, loading: false });
    });
  }

  createDevice() {
    const { connector } = this.props.params;
    const { pkg } = this.state.selectedVersion;
    this.setState({ loading: true });
    createConnector({ connector, pkg }, (error, response) => {
      if (error) {
        this.setState({ error, loading: false });
        return
      }
      const { key, uuid } = response;
      this.setState({ error, otp: key, uuid, generated: true, loading: false });
    })
  }

  versionSelect(versionInfo) {
    this.setState({ selectedVersion: versionInfo });
  }

  renderContent(content) {
    const { connector } = this.props.params;
    return (
      <Page>
        <PageHeader>Creating connector: {connector}</PageHeader>
        {content}
      </Page>
    );
  }

  render() {
    const {
      error,
      loading,
      details,
      selectedVersion,
      generated,
      otp,
      uuid,
    } = this.state;

    if (error) {
      return this.renderContent(<ErrorState description={error.message} />);
    }
    if (loading) {
      return this.renderContent(<Spinner size="large" />);
    }
    if (generated) {
      const configureUri = `/configure/${uuid}`;
      return this.renderContent(
        <div>
          <Download otp={otp} />
          <Link to={configureUri}>Configure Device</Link>
        </div>
      );
    }
    if (selectedVersion) {
      return this.renderContent(<h1>
        Selected <VersionInfo info={selectedVersion} />
        <Button onClick={this.createDevice} >Create</Button>
      </h1>);
    }

    return this.renderContent(<Versions versions={details.versions} select={this.versionSelect} />);
  }
}
