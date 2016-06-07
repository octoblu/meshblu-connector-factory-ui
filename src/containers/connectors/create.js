import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux'
import _ from 'lodash';

import { browserHistory } from 'react-router';
import PageLayout from '../page-layout'

import VersionsSelect from '../../components/VersionsSelect';
import Download from '../../components/Download';
import ConfigureCard from '../../components/ConfigureCard';

import { fetchConnectorDetails, selectVersion } from '../../actions/connectors/detail-actions';
import { createConnectorAction } from '../../actions/connectors/connector-actions';
import { fetchAvailableNodes } from '../../actions/things/available-actions'

class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedVersion: null
    }
    this.versionSelect = this.versionSelect.bind(this);
    this.createDevice = this.createDevice.bind(this);
  }

  componentDidMount() {
    const { connector } = this.props.params;
    this.props.dispatch(fetchAvailableNodes())
    this.props.dispatch(fetchConnectorDetails({ connector }))
  }


  componentWillReceiveProps(nextProps) {
    const { key, uuid } = nextProps.connector;
    if(key && uuid) {
      this.props.dispatch(push(`/connectors/generated/${uuid}/${key}`))
    }
  }

  createDevice() {
    const { connector } = this.props.params;
    const { pkg } = this.props.details.selectedVersion;
    this.props.dispatch(createConnectorAction({ connector, pkg }))
  }

  versionSelect(versionInfo) {
    this.props.dispatch(selectVersion(selectedVersion))
  }

  getConnectorType() {
    const { legacy, latest } = this.props.available
    const { connector } = this.props.params
    const foundLatest = _.find(latest, { connector })
    if(foundLatest) return foundLatest.type
    const foundLegacy = _.find(legacy, { connector })
    if(foundLegacy) return foundLegacy.type
    return ""
  }

  getStateBasics() {
    const { available, details } = this.props
    if(available.error) return { error: available.error }
    if(details.error) return { error: details.error }
    if(available.fetching) return { fetching: true }
    if(details.fetching) return { fetching: true }
    return { fetching: false, error: null }
  }

  renderContent(content) {
    const { error, fetching } = this.getStateBasics()
    const { connector } = this.props.params
    const type = this.getConnectorType()
    return (
      <PageLayout type={type} title={`Create ${connector}`} loading={fetching} error={error}>
        {content}
      </PageLayout>
    );
  }

  render() {
    const { info, selectedVersion } = this.props.details
    const type = this.getConnectorType()

    return this.renderContent(<VersionsSelect
      onSelect={this.createDevice}
      selected={selectedVersion}
      type={type}
      versions={info.versions} />);
  }
}

Create.propTypes = {
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps({ available, details, connector }) {
  return { available, details, connector }
}

export default connect(mapStateToProps)(Create)
