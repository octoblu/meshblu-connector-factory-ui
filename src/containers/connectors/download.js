import React, { Component } from 'react'
import { connect } from 'react-redux'

import fetchDownloadURL from '../../actions/connectors/fetchDownloadURL'
import DownloadButtons from '../../components/DownloadButtons'

function mapStateToProps({install}) {
  const {downloadURL, fetching} = install
  return {downloadURL, fetching}
}

function mapDispatchToProps(dispatch) {
  return {
    fetchDownloadURL: ({fetching, downloadURL}) => dispatch(fetchDownloadURL({fetching, downloadURL}))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DownloadButtons)
