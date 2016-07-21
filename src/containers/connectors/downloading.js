import React, { Component } from 'react'
import { connect } from 'react-redux'

import Generated from './generated.js'

class Downloaded extends Component {
  render(){
    return <Generated/ >
  }
}

function mapStateToProps({}) {
  return {}
}

export default connect(mapStateToProps)(Downloaded)
