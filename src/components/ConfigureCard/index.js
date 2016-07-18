import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { Card, Spinner, Button } from 'zooid-ui'

import './index.css'

const propTypes = {
  uuid: PropTypes.string.isRequired,
  downloaded: PropTypes.bool.isRequired,
  onDownload: PropTypes.func.isRequired,
}

const ConfigureCard = ({ uuid, downloaded, onDownload }) => {
  if (!downloaded) {
    return (
      <Card className="ConfigureCard">
        <main className="ConfigureCard-main">
          <div className="ConfigureCard-body">
            <Spinner />
            <br />
            <br />
            <h3>
              <Button className="ConfigureCard-button" kind="no-style" onClick={onDownload}>Skip to Next Step</Button>
            </h3>
          </div>
        </main>
      </Card>
    )
  }
  return (
    <Card className="ConfigureCard">
      <main className="ConfigureCard-main">
        <div className="ConfigureCard-body">
          <h3>Next Step</h3>
          <br />
          <Link className="ConfigureCard-button Button Button--hollow-approve" to={`/connectors/configure/${uuid}`}>Configure Thing</Link>
        </div>
      </main>
    </Card>
  )
}

ConfigureCard.propTypes = propTypes

export default ConfigureCard
