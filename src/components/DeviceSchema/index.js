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
  FormField,
  FormInput,
} from 'zooid-ui'

import {
  DeviceConfigureSchemaContainer,
} from 'zooid-meshblu-device-editor'

const SELECTED_PROP = 'schemas.selected.configure'

class DeviceSchema extends Component {
  constructor(props) {
    super(props)
    this.wrappedSubmit = this.wrappedSubmit.bind(this)
  }

  shouldComponentUpdate(nextProps) {
    const schemasMatch = _.isEqual(_.get(this.props.device, 'schemas'), _.get(nextProps.device, 'schemas'))
    const nameMatch = _.isEqual(_.get(this.props.device, 'name'), _.get(nextProps.device, 'name'))
    if (schemasMatch && nameMatch) {
      return false
    }
    return true
  }

  wrappedSubmit({ properties = {}, selected }) {
    properties.name = ReactDOM.findDOMNode(this.refs.deviceName).value
    properties[SELECTED_PROP] = selected
    this.props.onSubmit({ properties })
  }

  render() {
    const { device } = this.props
    if (_.isEmpty(_.get(device, 'schemas'))) return null
    return (
      <div className="DeviceSchema">
        <FormField label="Device Name" name="deviceName">
          <FormInput type="text" ref="deviceName" name="deviceName" defaultValue={device.name} />
        </FormField>
        <DeviceConfigureSchemaContainer
          device={device}
          onSubmit={this.wrappedSubmit}
          selected={_.get(device, SELECTED_PROP)}
        />
      </div>
    )
  }
}

DeviceSchema.defaultProps = defaultProps
DeviceSchema.propTypes = propTypes

export default DeviceSchema
