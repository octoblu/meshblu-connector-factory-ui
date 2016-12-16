import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

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
      </div>
    )
  }
}

OctobluOauth.propTypes = {
  dispatch: PropTypes.func.isRequired,
}

function mapStateToProps({ octoblu }) {
  return { octoblu }
}

export default connect(mapStateToProps)(OctobluOauth)
