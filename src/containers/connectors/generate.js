import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import PageLayout from '../page-layout';

import { browserHistory } from 'react-router';

import VersionsSelect from '../../components/VersionsSelect';
import Download from '../../components/Download';
import ConfigureCard from '../../components/ConfigureCard';

import { updateAndGenerateKey } from '../../helpers/connector-creator';
import { fetchAvailableNodes } from '../../actions/things/available-actions';
import { getDevice } from '../../services/device-service';

class Generate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      details: null,
      device: null,
      selectedVersion: null,
      loading: true,
      nodeType: null,
    };
    this.versionSelect = this.versionSelect.bind(this);
    this.selectDefaultVersion = this.selectDefaultVersion.bind(this);
    this.updateAndGenerate = this.updateAndGenerate.bind(this);
  }

  componentDidMount() {
    const { uuid } = this.props.params;
    getDevice({ uuid }, (error, device) => {
      if(error != null) {
        this.setState({ error, loading: false });
        return;
      }
      this.setState({ device });
      const { connector } = device;
      this.props.dispatch(fetchAvailableNodes())
      connectorDetails({ connector }, (error, details) => {
        this.setState({ error, details });
        getNodeType({ connector }, (error, nodeType) => {
          this.setState({ error, nodeType, loading: false });
          this.selectDefaultVersion()
        });
      });
    })
  }

  updateAndGenerate() {
    const { uuid } = this.props.params;
    const { pkg } = this.state.selectedVersion;
    const { connector } = this.state.device;
    this.setState({ loading: true });
    updateAndGenerateKey({ uuid, pkg, connector }, (error, response) => {
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
    return (
      <PageLayout type={_.get(nodeType, 'type')} title="Generate Installer" loading={loading} error={error}>
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
      onSelect={this.updateAndGenerate}
      selected={selectedVersion}
      type={_.get(nodeType, 'type')}
      versions={details.versions} />);
  }
}

Generate.propTypes = {
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps({ available }) {
  const { fetching, error, latest, legacy } = available
  return { fetching, error, latest, legacy  }
}

export default connect(mapStateToProps)(Generate)
