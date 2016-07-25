import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import DownloadingInfo from '../../components/DownloadingInfo'

function mapStateToProps({}) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {
    onClickNext:  ({uuid}) => dispatch(push(`/connectors/configure/${uuid}`)),
  }
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  const {uuid} = ownProps.params
  return {...ownProps, ...dispatchProps, ...stateProps, uuid}
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(DownloadingInfo)
