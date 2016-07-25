import React, { Component } from 'react'
import { connect } from 'react-redux'

import DownloadingInfo from '../../components/DownloadingInfo'

function mapStateToProps({}) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {}
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  const {uuid} = ownProps.params
  return {...ownProps, ...dispatchProps, ...stateProps, uuid}
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(DownloadingInfo)
