import React, { PropTypes, Component } from 'react'
import ReactDOM from 'react-dom'
import _  from 'lodash'
import JsonSchemaDefaults from 'json-schema-defaults'

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
    this.handleSelect = this.handleSelect.bind(this)
    this.state = { device: null, selected: null }
  }

  getSelectedSchema() {
    const { device } = this.props
    var selected = _.get(device, SELECTED_PROP)
    if (selected) return selected
    selected = _.get(device, 'schemas.configure.Default')
    if (selected) return 'Default'
    return _.head(_.keys(_.get(device, 'schemas.configure')))
  }

  componentWillMount() {
    const { device } = this.props
    const selected = this.getSelectedSchema()
    this.setState({ device, selected })
  }

  shouldComponentUpdate(nextProps, nextState) {
    // This is here so the device changing doesn't clear the device form.
    const name = _.get(this.props.device, 'name')
    const nextName = _.get(nextProps.device, 'name')
    const matchName = _.isEqual(name, nextName)

    const schemas = _.get(this.props.device, 'schemas')
    const nextSchemas = _.get(nextProps.device, 'schemas')
    const matchSchema = _.isEqual(schemas, nextSchemas)
    const matchSelected = _.isEqual(this.state.selected, nextState.selected)
    if (matchName && matchSchema && matchSelected) {
      return false
    }
    return true
  }

  wrappedSubmit({ properties = {}, selected }) {
    properties.name = ReactDOM.findDOMNode(this.refs.deviceName).value
    properties[SELECTED_PROP] = selected
    this.props.onSubmit({ properties })
  }

  handleSelect({ properties = {}, selected }) {
    var { device } = this.state
    if(confirm('This will overwrite your data using the schema defaults. Are you sure you want to continue?')) {
      const schema = device.schemas.configure[selected]
      const defaults = JsonSchemaDefaults(schema)
      device = _.assign(device, defaults)
      this.setState({ device, selected })
    } else {
      this.setState({ selected: this.state.selected })
    }
  }

  render() {
    const { device, selected } = this.state
    if (!device) return null
    if (_.isEmpty(_.get(device, 'schemas'))) return null

    return (
      <div className="DeviceSchema">
        <FormField label="Device Name" name="deviceName">
          <FormInput type="text" ref="deviceName" name="deviceName" defaultValue={device.name} />
        </FormField>
        <DeviceConfigureSchemaContainer
          device={device}
          selected={selected}
          onSubmit={this.wrappedSubmit}
          onSelect={this.handleSelect}
        />
      </div>
    )
  }
}

DeviceSchema.defaultProps = defaultProps
DeviceSchema.propTypes = propTypes

export default DeviceSchema
