import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import fetchDownloadURL from '../../actions/connectors/fetchDownloadURL'
import DownloadButtons from '../../components/DownloadButtons'

function onClickDownload(dispatch, { uuid, otp }) {
  dispatch(push(`/connectors/generated/${uuid}/${otp}/downloading`))
  return false
}

function mapStateToProps({ install }) {
  const { downloadURL, error, fetching, os, arch } = install
  return { downloadURL, error, fetching, os, arch }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchDownloadURL: ({ downloadURL, error, fetching, otp }) => dispatch(fetchDownloadURL({ downloadURL, error, fetching, otp })),
    onClickDownload: ({ uuid, otp }) => onClickDownload(dispatch, { uuid, otp }),
    onClickSkip: ({ uuid }) => dispatch(push(`/connectors/configure/${uuid}`)),
  }
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  const { otp, uuid } = ownProps.params
  return { ...ownProps, ...dispatchProps, ...stateProps, otp, uuid }
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(DownloadButtons)
