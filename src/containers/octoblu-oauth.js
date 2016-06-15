import React, { Component, PropTypes } from 'react';
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
    if (!this.props.octoblu.user) {
      return null
    }
    return (
      <div>
        {this.props.children}
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
