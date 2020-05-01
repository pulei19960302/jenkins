import React from 'react'
import moment from 'moment'
import { InputRange, MutipulLevelInput } from 'components'
import {
  Cascader,
  Checkbox,
  DatePicker,
  InputNumber,
  Select,
  Input,
  Radio,
  TimePicker,
  TreeSelect,
} from 'antd'

const { MonthPicker, RangePicker } = DatePicker
const { TextArea } = Input
const { Group: CheckboxGroup } = Checkbox
const { Group: RadioGroup } = Radio
const { Option } = Select

const Format = {
  DATE: 'YYYY-MM-DD',
  DATETIME: 'YYYY-MM-DD HH:mm:ss',
  TIME: 'HH:mm:ss',
  MONTH: 'YYYY-MM',
}

/*
 * 表单字段类型
 */
const fieldTypes = {
  date: ({ initialValue, inputProps = {} }) => ({
    input: <DatePicker {...inputProps} style={{ width: '100%' }} getPopupContainer={trigger => trigger.parentNode} />,
    initialValue,
  }),
  dateRange: ({
    initialValue = [],
    inputProps = {},
    placeholder = ['开始时间', '结束时间'],
  }) => {
    const { format = Format.DATE } = inputProps
    return {
      input: (
        <RangePicker
          showTime={false}
          format={format}
          {...inputProps}
          placeholder={placeholder}
          style={{ width: '100%' }}
          getPopupContainer={trigger => trigger.parentNode}
        />
      ),
      initialValue,
    }
  },
  datetime: ({ initialValue, inputProps = {} }) => {
    const { format = Format.DATETIME } = inputProps
    return {
      input: (
        <DatePicker
          showTime
          format={format}
          {...inputProps}
          style={{ width: '100%' }}
          getPopupContainer={trigger => trigger.parentNode}
        />
      ),
      initialValue,
    }
  },
  datetimeRange: ({
    initialValue = [],
    inputProps = {},
    placeholder = ['开始时间', '结束时间'],
  }) => {
    const { format = Format.DATETIME } = inputProps
    return {
      input: (
        <RangePicker
          showTime
          format={format}
          {...inputProps}
          placeholder={placeholder}
          style={{ width: '100%' }}
          getPopupContainer={trigger => trigger.parentNode}
        />
      ),
      initialValue,
    }
  },
  enum: ({ field, placeholder, inputProps, meta = {} }) => {
    const { enums, name } = field
    let options = enums
    if (!Array.isArray(options)) {
      options = Object.keys(enums).reduce(
        (occ, key) => occ.concat([{ value: key, name: enums[key] }]),
        []
      )
    }
    const tmpPlaceholder = placeholder || `请选择${name}`
    return (
      <Select
        style={{ width: '100%' }}
        allowClear
        placeholder={tmpPlaceholder}
        {...inputProps}
        getPopupContainer={trigger => trigger.parentNode}
      >
        {options.map(d => (
          <Option value={d.value} key={d.value}>
            {d.name}
          </Option>
        ))}
      </Select>
    )
  },
  boolean: ({ inputProps }) => <Checkbox {...inputProps} />,
  number: ({ meta = {}, inputProps }) => (
    <InputNumber
      min={meta.min !== undefined ? meta.min : -Infinity}
      max={meta.max !== undefined ? meta.max : Infinity}
      step={meta.step || 1}
      {...inputProps}
      style={{ width: '100%' }}
    />
  ),
  textarea: ({ meta = {}, field, placeholder, inputProps }) => {
    const tmpPlaceholder =
      placeholder === false
        ? ''
        : placeholder || meta.placeholder || `请输入${field.name}`
    return (
      <TextArea
        rows={meta.rows || 3}
        placeholder={tmpPlaceholder}
        autosize={meta.autosize}
        {...inputProps}
      />
    )
  },
  text: ({ meta = {}, field, placeholder, inputProps }) => {
    const tmpPlaceholder =
      placeholder === false
        ? ''
        : placeholder || meta.placeholder || `请输入${field.name}`
    return (
      <Input
        type="text"
        placeholder={tmpPlaceholder}
        {...inputProps}
        style={{ width: '100%' }}
      />
    )
  },
  month: ({ initialValue, inputProps = {} }) => {
    const { format = Format.MONTH } = inputProps
    return {
      input: (
        <MonthPicker
          {...inputProps}
          format={format}
          style={{ width: '100%' }}
          getPopupContainer={trigger => trigger.parentNode}
        />
      ),
      initialValue,
    }
  },
  inputRange: ({ placeholder, field }) => {
    return <InputRange placeholder={placeholder} rangeType={field.rangeType} />
  },
  monthdate: ({ initialValue, inputProps = {} }) => {
    const { format = Format.MONTH } = inputProps
    return {
      input: (
        <MonthPicker
          {...inputProps}
          format={format}
          style={{ width: '100%' }}
          allowClear={false}
          getPopupContainer={trigger => trigger.parentNode}
        />
      ),
      initialValue,
    }
  },
  time: ({ initialValue, inputProps }) => {
    const { format = Format.TIME } = inputProps
    return {
      input: (
        <TimePicker {...inputProps} format={format} style={{ width: '100%' }} getPopupContainer={trigger => trigger.parentNode} />
      ),
      initialValue,
    }
  },
  cascader: ({ initialValue, inputProps }) => ({
    input: <Cascader {...inputProps} style={{ width: '100%' }} getPopupContainer={trigger => trigger.parentNode} />,
    initialValue,
  }),
  checkboxGroup: ({ initialValue, inputProps }) => ({
    input: <CheckboxGroup {...inputProps} />,
    initialValue,
  }),
  radioGroup: ({ initialValue, inputProps }) => ({
    input: <RadioGroup {...inputProps} />,
    initialValue,
  }),
  treeSelect: ({ initialValue, inputProps }) => ({
    input: <TreeSelect treeNodeFilterProp="title" {...inputProps} style={{ width: '100%' }} getPopupContainer={trigger => trigger.parentNode} />,
    initialValue,
  }),
  mutipulLevelInput: ({ field }) => {
    const { enums, placeholders, inputType, initialValue, initProps } = field
    return <MutipulLevelInput initProps={initProps} initialValue={initialValue} inputType={inputType} enums={enums} placeholders={placeholders} />
  }
}

/*
 * 扩展表单字段类型
 */
export function combineTypes(extras) {
  Object.assign(fieldTypes, extras)
}

export default fieldTypes
