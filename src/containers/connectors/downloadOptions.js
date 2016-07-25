import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import DownloadOptionsList from '../../components/DownloadOptionsList'

function mapStateToProps({}) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {}
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  const {otp, uuid} = ownProps.params
  return {...ownProps, ...dispatchProps, ...stateProps, otp, uuid}
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(DownloadOptionsList)
