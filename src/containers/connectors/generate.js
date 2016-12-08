import _ from 'lodash'
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { setBreadcrumbs } from '../../actions/page-actions'
import PageLayout from '../page-layout'

import VersionsSelect from '../../components/VersionsSelect'

import { upsertConnectorAction, gotToGeneratedConnector } from '../../actions/connectors/connector-actions'
import { fetchDevice } from '../../actions/things/device-actions'

class Generate extends Component {
  constructor(props) {
    super(props)
    this.updateAndGenerate = this.updateAndGenerate.bind(this)
    this.getGithubSlug = this.getGithubSlug.bind(this)
    this.getRegistryItem = this.getRegistryItem.bind(this)
  }

  componentDidMount() {
    const { uuid } = this.props.params
    this.props.dispatch(setBreadcrumbs([
      {
        label: 'Connectors',
        link: '/',
      },
      {
        label: 'My Connectors',
        link: '/connectors/my',
      },
      {
        label: 'Configure',
        link: `/connectors/configure/${uuid}`,
      },
      {
        label: 'Generate',
      },
    ]))
    this.props.dispatch(fetchDevice({ uuid }))
  }

  componentWillReceiveProps(nextProps) {
    const { key, uuid } = nextProps.connector
    if (key && uuid) {
      this.props.dispatch(gotToGeneratedConnector({ key, uuid }))
    }
  }

  getGithubSlug() {
    const { connector, connectorMetadata } = this.props.device.item
    if (connectorMetadata && connectorMetadata.githubSlug) {
      return connectorMetadata.githubSlug
    }
    return `octoblu/${connector}`
  }

  getRegistryItem() {
    const { items } = this.props.available
    const githubSlug = this.getGithubSlug()
    return _.find(items, { githubSlug })
  }

  updateAndGenerate(selectedVersion) {
    const { uuid } = this.props.params
    const { version } = selectedVersion || _.get(this.props, 'details.selectedVersion')
    const { octoblu, device } = this.props
    const registryItem = _.get(device, 'item.octoblu.registryItem') || this.getRegistryItem()
    const { connector } = device.item
    this.props.dispatch(upsertConnectorAction({ uuid, registryItem, version, connector, octoblu }))
  }

  render() {
    const { device } = this.props
    const { info, selectedVersion } = this.props.details
    return (
      <PageLayout type={device.item.type} title="Generate Installer">
        <VersionsSelect
          onSelect={this.updateAndGenerate}
          selected={selectedVersion}
          versions={info.tags}
        />
      </PageLayout>
    )
  }
}

Generate.propTypes = {
  dispatch: PropTypes.func.isRequired,
}

function mapStateToProps({ available, device, details, connector, octoblu }) {
  const { uuid, token } = octoblu
  return { available, device, details, connector, octoblu: { uuid, token } }
}

export default connect(mapStateToProps)(Generate)
