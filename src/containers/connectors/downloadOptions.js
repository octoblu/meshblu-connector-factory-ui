import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import DownloadOptionsList from '../../components/DownloadOptionsList'

function mapStateToProps({}) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {
    onClickNext:  ({uuid}) => dispatch(push(`/connectors/configure/${uuid}`)),
  }
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  const {otp, uuid} = ownProps.params
  return {...ownProps, ...dispatchProps, ...stateProps, otp, uuid}
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(DownloadOptionsList)
