import React from 'react'
import _ from 'lodash'
import fieldTypes from './fieldTypes'

export default (field, item, onChange) => {
  let { type } = field
  const {
    key,
    enums,
    meta,
    render,
    placeholder,
    inputProps,
  } = field
  let originInitialValue = undefined
  originInitialValue = _.get(item, key)

  type =
    (Object.prototype.hasOwnProperty.call(fieldTypes, type) && type) ||
    (enums && 'enum') ||
    'text'

  const typedItem = (render || fieldTypes[type])({
    initialValue: originInitialValue,
    meta,
    field,
    placeholder,
    inputProps,
  })
  let { input, initialValue } = typedItem

  if (React.isValidElement(typedItem)) {
    input = typedItem
    initialValue = originInitialValue
  }
  return React.cloneElement(input, {
    value: initialValue,
    onChange: value => onChange(key, value),
  })
}
