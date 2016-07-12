import React, { Component, PropTypes } from 'react'
import AppActions from '../../components/AppActions'
import { connect } from 'react-redux'
import PageLayout from '../page-layout'
import { setBreadcrumbs } from '../../actions/page-actions'

import RegistryList from '../../components/RegistryList'

class Available extends Component {
  componentDidMount() {
    this.props.dispatch(setBreadcrumbs([
      {
        label: 'Connectors',
        link: '/',
      },
      {
        label: 'Available Connectors',
      },
    ]))
  }

  render() {
    const { registries } = this.props.available

    return (<PageLayout title="Available Connectors" actions={<AppActions />}>
      <div>
        <RegistryList registries={registries} />
      </div>
    </PageLayout>)
  }
}

Available.propTypes = {
  dispatch: PropTypes.func.isRequired,
}

function mapStateToProps({ available }) {
  return { available }
}

export default connect(mapStateToProps)(Available)
