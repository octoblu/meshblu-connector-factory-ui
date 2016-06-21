import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'

import ZooidOctobluIntercom from 'zooid-octoblu-intercom'
import { fetchOctobluUserAction } from '../actions/octoblu/user-actions'
import { needsUpdate } from '../helpers/actions'

class OctobluOauth extends Component {
  componentDidMount() {
    if (needsUpdate(this.props.octoblu)) {
      this.props.dispatch(fetchOctobluUserAction())
    }
  }

  render() {
    const { children, octoblu } = this.props
    const { user, uuid, token } = octoblu
    if (!user || !uuid || !token) {
      return null
    }

    return (
      <div>
        {children}
        <ZooidOctobluIntercom appId="ux5bbkjz" uuid={uuid} token={token} />
      </div>
    );
  }
}

OctobluOauth.propTypes = {
  dispatch: PropTypes.func.isRequired,
}

function mapStateToProps({ octoblu }) {
  return { octoblu }
}

export default connect(mapStateToProps)(OctobluOauth)
