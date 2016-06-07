import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { browserHistory } from 'react-router';
import PageLayout from '../page-layout'

import VersionsSelect from '../../components/VersionsSelect';
import Download from '../../components/Download';
import ConfigureCard from '../../components/ConfigureCard';

import { connectorDetails } from '../../services/connector-detail-service';
import { createConnector } from '../../helpers/connector-creator';
import { fetchAvailableNodes } from '../../actions/things/available-actions'

class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      details: {},
      selectedVersion: null,
      fetching: true
    };
    this.versionSelect = this.versionSelect.bind(this);
    this.selectDefaultVersion = this.selectDefaultVersion.bind(this);
    this.createDevice = this.createDevice.bind(this);
  }

  componentDidMount() {
    const { connector } = this.props.params;
    this.props.dispatch(fetchAvailableNodes())
    connectorDetails({ connector }, (error, details) => {
      this.setState({ error, details, fetching: false });
    });
  }

  createDevice() {
    const { connector } = this.props.params;
    const { pkg } = this.state.selectedVersion;
    this.setState({ fetching: true });
    createConnector({ connector, pkg }, (error, response) => {
      if (error) {
        this.setState({ error, fetching: false });
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

  getNodeType() {
    const { legacy, latest } = this.state
    const { connector } = this.props.params
    const foundLatest = _.find(latest, { connector })
    if(foundLatest) return foundLatest
    return _.find(legacy, { connector })
  }

  renderContent(content) {
    const { error, fetching } = this.state
    const { connector } = this.props.params
    const nodeType = this.getNodeType() || {}
    return (
      <PageLayout type={nodeTypes.type} title={`Create ${connector}`} loading={fetching} error={error}>
        {content}
      </PageLayout>
    );
  }

  render() {
    const {
      details,
      selectedVersion,
    } = this.state;

    const nodeType = this.getNodeType() || {}

    return this.renderContent(<VersionsSelect
      onSelect={this.createDevice}
      selected={selectedVersion}
      type={nodeType.type}
      versions={details.versions} />);
  }
}

Create.propTypes = {
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps({ available }) {
  const { fetching, error, latest, legacy } = available
  return { fetching, error, latest, legacy  }
}

export default connect(mapStateToProps)(Create)
