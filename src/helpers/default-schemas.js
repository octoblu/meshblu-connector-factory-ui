import _ from 'lodash'
import jsonSchemaDefaults from 'json-schema-defaults'

export function findDefaultSchema(schemas = {}) {
  if (schemas.configure == null) return null
  const keys = _.keys(schemas.configure)
  if (keys.length === 1) return schemas.configure[_.first(keys)]
  if (schemas.configure.Default) return schemas.configure.Default
  if (schemas.configure.default) return schemas.configure.default
  return null
}

export function getDefaultValues(schemas) {
  const defaultSchema = findDefaultSchema(schemas)
  if (_.isEmpty(defaultSchema)) return null
  return jsonSchemaDefaults(defaultSchema)
}
