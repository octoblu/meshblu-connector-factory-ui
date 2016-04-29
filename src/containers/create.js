import React, { Component } from 'react';
import { browserHistory } from 'react-router';

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
import ConfigureCard from '../components/ConfigureCard';

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
      browserHistory.push(`/connectors/generated/${uuid}/${key}`);
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
      selectedVersion
    } = this.state;

    if (error) {
      return this.renderContent(<ErrorState description={error.message} />);
    }

    if (loading) {
      return this.renderContent(<Spinner size="large" />);
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
