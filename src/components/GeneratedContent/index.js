import React, { PropTypes } from 'react'

import styles from './styles.css'

const propTypes = {
  key: PropTypes.string.isRequired,
  onDownload: PropTypes.func.isRequired,
  selectedVersion: PropTypes.string.isRequired,
  uuid: PropTypes.string.isRequired,
}
const defaultProps = {}

const GeneratedContent = () => {
  return (
    <div className={styles.Wrapper}>
    </div>
  )
}

GeneratedContent.propTypes    = propTypes
GeneratedContent.defaultProps = defaultProps

export default GeneratedContent
