import React, { Component } from 'react'
import { connect } from 'react-redux'

import fetchDownloadURL from '../../actions/connectors/fetchDownloadURL'
import DownloadButtons from '../../components/DownloadButtons'

function mapStateToProps({install}) {
  return {downloadURL: install.downloadURL}
}

function mapDispatchToProps(dispatch) {
  return {
    fetchDownloadURL: () => dispatch(fetchDownloadURL())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DownloadButtons)
