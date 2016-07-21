import React, { PropTypes } from 'react'
import styles from './styles.css'

const propTypes = {}
const defaultProps = {}

const DownloadLayout = ({ children }) => {
  return <div>
    <h1 className={styles.header}>Install</h1>
    {children}
  </div>
}

DownloadLayout.propTypes    = propTypes
DownloadLayout.defaultProps = defaultProps

export default DownloadLayout
