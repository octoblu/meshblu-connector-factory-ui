import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import PageLayout from '../page-layout';

import VersionsSelect from '../../components/VersionsSelect';

import { generateConnectorAction } from '../../actions/connectors/connector-actions';
import { selectVersion } from '../../actions/connectors/detail-actions';
import { getDevice } from '../../actions/things/device-actions';

class Generate extends Component {
  constructor(props) {
    super(props);
    this.versionSelect = this.versionSelect.bind(this);
    this.updateAndGenerate = this.updateAndGenerate.bind(this);
  }

  componentDidMount() {
    const { uuid } = this.props.params;
    this.props.dispatch(getDevice({ uuid }))
  }

  componentWillReceiveProps(nextProps) {
    const { key, uuid } = nextProps.connector;
    if (key && uuid) {
      this.props.dispatch(push(`/connectors/generated/${uuid}/${key}`))
    }
  }

  updateAndGenerate() {
    const { uuid } = this.props.params;
    const { pkg } = this.props.details.selectVersion;
    const { connector } = this.props.device;
    this.props.dispatch(generateConnectorAction({ uuid, pkg, connector }))
  }

  versionSelect(selectedVersion) {
    this.props.dispatch(selectVersion(selectedVersion));
  }

  render() {
    const { device, error, fetching } = this.props
    const { info, selectedVersion } = this.props.details
    return (
      <PageLayout type={device.type} title="Generate Installer" loading={fetching} error={error}>
        <VersionsSelect
          onSelect={this.updateAndGenerate}
          selected={selectedVersion}
          versions={info.versions}
        />
      </PageLayout>
    )
  }
}

Generate.propTypes = {
  dispatch: PropTypes.func.isRequired,
}

function mapStateToProps({ device, details, connector }) {
  const state = { device: device.item, details, connector }
  const error = device.error || details.error || connector.error
  if (error) {
    return { ...state, error, fetching: false }
  }
  if (device.fetching || details.fetching || connector.generating) {
    return { ...state, fetching: true, error: null }
  }
  return { ...state, fetching: false, error: null }
}

export default connect(mapStateToProps)(Generate)
