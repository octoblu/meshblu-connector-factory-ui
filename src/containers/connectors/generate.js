import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { setBreadcrumbs } from '../../actions/page-actions'
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
    this.props.dispatch(setBreadcrumbs([
      {
        label: 'Home',
        link: '/',
      },
      {
        label: 'My Things',
        link: '/things/my',
      },
      {
        label: 'Configure',
        link: `/things/configure/${uuid}`,
      },
      {
        label: 'Generate',
      },
    ]))
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
    const { device } = this.props
    const { info, selectedVersion } = this.props.details
    return (
      <PageLayout type={device.type} title="Generate Installer">
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
  return { device: device.item, details, connector }
}

export default connect(mapStateToProps)(Generate)
