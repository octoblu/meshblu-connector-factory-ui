import React, { Component } from 'react';
import {
  Page,
  PageHeader,
  Spinner,
  ErrorState,
  Button,
} from 'zooid-ui';

import Versions from '../components/Versions';
import VersionInfo from '../components/VersionInfo';

import { connectorDetails } from '../helpers/connector-detail-service';
import { registerConnector } from '../helpers/device-service';
import { generateOtp } from '../helpers/otp-service';
import { getConnectorMetadata } from '../helpers/connector-metadata';

export default class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      details: null,
      selectedVersion: null,
      generated: false,
      key: null,
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
    this.setState({ loading: true })
    registerConnector({ connector }, (error, device) => {
      if (error) {
        this.setState({ error, loading: false });
        return;
      }
      const { uuid, token } = device;
      const metadata = getConnectorMetadata({ pkg });

      generateOtp({ uuid, token, metadata  }, (error, response) => {
        if (error) {
          this.setState({ error, loading: false });
          return;
        }
        const { key } = response;
        this.setState({ key, generated: true, loading: false })
      });
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
      key,
    } = this.state;

    if (error) {
      return this.renderContent(<ErrorState description={error.message} />);
    }
    if (loading) {
      return this.renderContent(<Spinner size="large" />);
    }
    if (generated) {
      const downloadLink = `/download/${key}`;
      return this.renderContent(<Button href={downloadLink}>Download</Button>);
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
