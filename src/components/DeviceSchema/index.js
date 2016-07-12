import React, { PropTypes, Component } from 'react'
import ReactDOM from 'react-dom'
import _  from 'lodash'

import './index.css'

const propTypes = {
  device: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
}

const defaultProps = {}

import {
  Button,
  FormActions,
  FormField,
  FormInput,
} from 'zooid-ui'

import {
  DeviceConfigureSchemaContainer,
} from 'zooid-meshblu-device-editor'

class DeviceSchema extends Component {
  constructor(props) {
    super(props)
    this.handleNameChange  = this.handleNameChange.bind(this)
  }

  shouldComponentUpdate(nextProps) {
    const schemasMatch = _.isEqual(_.get(this.props.device, 'schemas'), _.get(nextProps.device, 'schemas'))
    const nameMatch = _.isEqual(_.get(this.props.device, 'name'), _.get(nextProps.device, 'name'))
    if (schemasMatch && nameMatch) {
      return false
    }
    return true
  }

  handleNameChange() {
    const ref = this.refs.deviceName
    const deviceName = ReactDOM.findDOMNode(ref).value
    const { onSubmit } = this.props
    onSubmit({ properties: { name: deviceName } })
  }

  render() {
    const { device, onSubmit } = this.props
    if (device == null) return null
    return (
      <div className="DeviceSchema">
        <FormField label="Device Name" name="deviceName">
          <FormInput type="text" ref="deviceName" name="deviceName" defaultValue={device.name} />
        </FormField>
        <FormActions className="DeviceSchema--actions">
          <Button onClick={this.handleNameChange} kind="no-style">Change Name</Button>
        </FormActions>
        <DeviceConfigureSchemaContainer device={device} onSubmit={onSubmit} />
      </div>
    )
  }
}

DeviceSchema.defaultProps = defaultProps
DeviceSchema.propTypes = propTypes

export default DeviceSchema
