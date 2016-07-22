import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import fetchDownloadURL from '../../actions/connectors/fetchDownloadURL'
import DownloadButtons from '../../components/DownloadButtons'

function mapStateToProps({install}) {
  const {downloadURL, error, fetching, os, arch} = install
  return {downloadURL, error, fetching, os, arch}
}

function mapDispatchToProps(dispatch) {
  return {
    fetchDownloadURL: ({downloadURL, error, fetching, otp}) => dispatch(fetchDownloadURL({downloadURL, error, fetching, otp}))
  }
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  const {otp} = ownProps.params
  return {...ownProps, ...dispatchProps, ...stateProps, otp}
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(DownloadButtons)
