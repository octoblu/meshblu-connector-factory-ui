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
    this.selectDefaultVersion = this.selectDefaultVersion.bind(this);
    this.createDevice = this.createDevice.bind(this);
  }

  componentDidMount() {
    const { connector } = this.props.params;
    connectorDetails({ connector }, (error, details) => {
      this.setState({ error, details });
      getNodeType({ connector }, (error, nodeType) => {
        this.setState({ error, nodeType, loading: false });
        this.selectDefaultVersion()
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

  selectDefaultVersion() {
    const { details } = this.state;
    const latestVersion = details['dist-tags'].latest;
    this.versionSelect({ version: latestVersion, latest: true, pkg: details.versions[latestVersion] })
  }

  versionSelect(versionInfo) {
    this.setState({ selectedVersion: versionInfo });
  }

  getSelectedVersion() {
    const { selectedVersion } = this.state;
    if (selectedVersion) {
      const { nodeType } = this.state;
      let type = null
      if(nodeType) {
        type = nodeType.type;
      }
      return <SelectedVersion info={selectedVersion} createDevice={this.createDevice} type={type} />
    }
    return null;
  }

  renderContent(content) {
    const { connector } = this.props.params;
    let ConnectorIcon = null
    const { nodeType } = this.state;
    if (nodeType) {
      const { type } = nodeType;
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
    } = this.state;

    if (error) {
      return this.renderContent(<ErrorState description={error.message} />);
    }

    if (loading) {
      return this.renderContent(<Spinner size="large" />);
    }

    return this.renderContent(
      <div className="CenterIt">
        {this.getSelectedVersion()}
        <h3>-- OR --</h3>
        <Versions versions={details.versions} select={this.versionSelect} />
      </div>
    );
  }
}
