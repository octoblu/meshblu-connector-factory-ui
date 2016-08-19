import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import fetchAvailableDownloads from '../../actions/connectors/fetchAvailableDownloads'
import DownloadOptionsList from '../../components/DownloadOptionsList'

function mapStateToProps({availableDownloads}) {
  return {availableDownloads: availableDownloads.availableDownloads}
}

function mapDispatchToProps(dispatch) {
  return {
    fetchAvailableDownloads:  (({otp}) => dispatch(fetchAvailableDownloads({otp}))),
    onClickNext:  ({uuid}) => dispatch(push(`/connectors/configure/${uuid}`)),
  }
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  const {otp, uuid} = ownProps.params
  return {...ownProps, ...dispatchProps, ...stateProps, otp, uuid}
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(DownloadOptionsList)
