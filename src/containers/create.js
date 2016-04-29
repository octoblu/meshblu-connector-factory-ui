import React, { Component } from 'react';
import { Link } from 'react-router';

import {
  Page,
  PageHeader,
  PageTitle,
  Spinner,
  ErrorState,
  Button,
  DeviceIcon,
} from 'zooid-ui';

import Versions from '../components/Versions';
import VersionInfo from '../components/VersionInfo';
import Download from '../components/Download';
import SelectedVersion from '../components/SelectedVersion';

import { connectorDetails } from '../services/connector-detail-service';
import { createConnector } from '../helpers/connector-creator';
import { getNodeType } from '../services/node-type-service';

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
      nodeType: null,
    };
    this.versionSelect = this.versionSelect.bind(this);
    this.createDevice = this.createDevice.bind(this);
  }

  componentDidMount() {
    const { connector } = this.props.params;
    connectorDetails({ connector }, (error, details) => {
      this.setState({ error, details });
      getNodeType({ connector }, (error, nodeType) => {
        this.setState({ error, nodeType, loading: false });
      });
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
    let ConnectorIcon = null
    if (this.state.nodeType) {
      const { type } = this.state.nodeType;
      ConnectorIcon = <DeviceIcon className="ConnectorIcon" type={type} />
    }
    return (
      <Page>
        <PageHeader>
          {ConnectorIcon}
          <PageTitle>Create: {connector}</PageTitle>
        </PageHeader>
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
      generated
    } = this.state;

    if (error) {
      return this.renderContent(<ErrorState description={error.message} />);
    }

    if (loading) {
      return this.renderContent(<Spinner size="large" />);
    }

    if (generated) {
      const { uuid, otp } = this.state;
      const configureUri = `/connectors/configure/${uuid}`;
      return this.renderContent(
        <div>
          <Download otp={otp} />
          <Link to={configureUri}>Configure Device</Link>
        </div>
      );
    }

    if (selectedVersion) {
      const { type } = this.state.nodeType;
      return this.renderContent(
        <SelectedVersion info={selectedVersion} createDevice={this.createDevice} type={type} />
      );
    }

    return this.renderContent(<Versions versions={details.versions} select={this.versionSelect} />);
  }
}
