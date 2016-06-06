import React, { Component } from 'react';
import _ from 'lodash';

import { browserHistory } from 'react-router';
import PageLayout from './PageLayout'

import VersionsSelect from '../components/VersionsSelect';
import Download from '../components/Download';
import ConfigureCard from '../components/ConfigureCard';

import { connectorDetails } from '../services/connector-detail-service';
import { createConnector } from '../helpers/connector-creator';
import { getNodeType } from '../services/node-type-service';

export default class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      details: {},
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

  renderContent(content) {
    const { nodeType, error, loading } = this.state
    const { connector } = this.props.params
    return (
      <PageLayout type={_.get(nodeType, 'type')} title={`Create ${connector}`} loading={loading} error={error}>
        {content}
      </PageLayout>
    );
  }

  render() {
    const {
      details,
      selectedVersion,
      nodeType,
    } = this.state;

    return this.renderContent(<VersionsSelect
      onSelect={this.createDevice}
      selected={selectedVersion}
      type={_.get(nodeType, 'type')}
      versions={details.versions} />);
  }
}
