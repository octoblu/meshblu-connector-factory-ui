import React, { Component } from 'react'
import { connect } from 'react-redux'

import fetchDownloadLink from '../../actions/connectors/fetchDownloadLink'
import DownloadButtons from '../../components/DownloadButtons'

function mapStateToProps({install}) {
  const {downloadLink, os, arch} = install
  console.log('state', {os, arch})
  return {downloadLink, os, arch}
}

function mapDispatchToProps(dispatch) {
  return {
    fetchDownloadLink: () => dispatch(fetchDownloadLink())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DownloadButtons)
