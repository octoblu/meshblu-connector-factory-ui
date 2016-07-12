import React from 'react'
import { Link } from 'react-router'
import { Button } from 'zooid-ui'

const AppActions = () => {
  return (
    <ul>
      <li><Link to="/connectors/my" className="Button Button--no-style">My Connectors</Link></li>
      <li>|</li>
      <li><Link to="/connectors/available" className="Button Button--no-style">Available Connectors</Link></li>
      <li>|</li>
      <li><Button href="https://meshblu-connectors.readme.io" kind="no-style">Getting Started</Button></li>
    </ul>
  )
}

export default AppActions
