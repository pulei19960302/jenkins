import React from 'react'
import { CaretDownOutlined, CaretUpOutlined, RedoOutlined, SearchOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Row, Col, Button } from 'antd';
import _ from 'lodash'
import moment from 'moment'
import classNames from 'classnames'
import createField from './createField'
import styles from './index.less'

const FormItem = Form.Item

const Format = {
  DATE: 'YYYY-MM-DD',
  DATETIME: 'YYYY-MM-DD HH:mm:ss',
  TIME: 'HH:mm:ss',
  MONTH: 'YYYY-MM',
}

const initSearch = (search, fields) => {  // 初始化search
  if (!search) { return {} }
  const tmpSearch = _.clone(search)
  fields.forEach(({ key, searchKeys, type }) => {
    switch (type) {
      case 'dateRange':
      case 'datetimeRange':
        {
          const start = _.get(search, searchKeys[0])
          const end = _.get(search, searchKeys[1])
          if (start && end) {
            // search[key] = [moment(start), moment(end)]
            tmpSearch[key] = [moment(start), moment(end)]
          }
        }
        break
      case 'inputRange':
        {
          const start = _.get(search, searchKeys[0]) || ''
          const end = _.get(search, searchKeys[1]) || ''
          // search[key] = [start, end]
          tmpSearch[key] = [start, end]
        }
        break
      case 'mutipulLevelInput':
        {
          const select = _.get(search, searchKeys[0]) || ''
          const input = _.get(search, searchKeys[1]) || ''
          tmpSearch[key] = [select, input]
        }
        break
      case 'date':
      case 'month':
        {
          const date = _.get(search, key)
          // search[key] = date ? moment(date) : ''
          tmpSearch[key] = date ? moment(date) : ''
        }
        break
      default:
        break
    }
  })
  // return search
  return tmpSearch
}



// 获取最终的search对象
const transformSearch = (search, fields) => {
  const tmpSearch = _.clone(search)
  // 转换数据
  fields.forEach(
    ({ key, type, searchKeys = ['startTime', 'endTime'], format }) => {
      const value = tmpSearch[key]
      switch (type) {
        case 'dateRange': {
          const [startTime, endTime] = value || []
          const formatType = format || Format.DATE
          if (startTime) {
            tmpSearch[searchKeys[0]] = startTime.format(formatType)
          } else {
            delete tmpSearch[searchKeys[0]]
          }

          if (endTime) {
            tmpSearch[searchKeys[1]] = endTime.format(formatType)
          } else {
            delete tmpSearch[searchKeys[1]]
          }
          // tmpSearch[searchKeys[0]] = startTime ? startTime.format(formatType) : ''
          // tmpSearch[searchKeys[1]] = endTime ? endTime.format(formatType) : ''
          delete tmpSearch[key]
          break
        }
        case 'datetimeRange': {
          const [startTime, endTime] = value || []
          const formatType = format || Format.DATETIME
          tmpSearch[searchKeys[0]] = startTime ? startTime.format(formatType) : ''
          tmpSearch[searchKeys[1]] = endTime ? endTime.format(formatType) : ''
          delete tmpSearch[key]
          break
        }
        case 'date': {
          tmpSearch[key] = value ? `${value.format(format || Format.DATE)}` : ''
          break
        }
        case 'monthdate': {
          tmpSearch[key] = value
            ? `${value.format(format || Format.MONTH)}`
            : ''
          break
        }
        case 'inputRange': {
          const [start, end] = value || []
          tmpSearch[searchKeys[0]] = start || ''
          tmpSearch[searchKeys[1]] = end || ''
          delete tmpSearch[key]
          break
        }
        case 'mutipulLevelInput': {
          const [select, input] = value || []
          tmpSearch[searchKeys[0]] = select || ''
          tmpSearch[searchKeys[1]] = input || ''
          delete tmpSearch[key]
          break
        }
        default:
          break
      }
    }
  )

  // 重置页码为1
  return { ...tmpSearch }
}

/**
 * 查询表单
 *
 * @props fields 表单字段定义 itemCol默认为6 日期范围选择需指定 itemCol：12
 * @props search 查询字段初始值
 * @props formItemLayout 查询框布局定义
 * @props onSearch 查询的回调函数
 * @props onChange 修改的回调函数
 *
 */
@Form.create({})
class SearchForm extends React.Component {
  constructor(props) {
    super(props)
    this.initialSearch = props.fields.reduce((obj, { key, initialValue }) => {
      obj[key] = initialValue || undefined
      return obj
    }, {})
    this.state = {
      search: initSearch(this.props.search, props.fields)/* JSON.parse(JSON.stringify(this.props.search || {})) */,
      showSwitch: false,
      searchItemNum: 4,
      minSearchItem: 4,
      maxSearchItem: 999,
      leftSpan: 18,
      leftItemSpan: 6,
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.handleReset = this.handleReset.bind(this)
    this.renderSwitch = this.renderSwitch.bind(this)
    this.handSwitch = this.handSwitch.bind(this)
    this.searchRef = React.createRef()
  }
  componentDidMount() {
    this.init()
    document.addEventListener('keypress', this.onKeyPressDo)
  }
  onKeyPressDo = (e) => {
    if (e.code === 'Enter' && e.path.includes(this.searchRef.current)) {
      console.log('press enter in search area')
      this.handleSearch(this.state.search)
    }
  }
  componentWillUnmount() {
    document.removeEventListener('keypress', this.onKeyPressDo)
  }
  init() {
    const { fields } = this.props
    const { search } = this.state
    let minIndex = 0
    const colNum = fields.reduce((prev, item, currentIndex) => {
      const next = prev + (item.itemCol || 6)
      if (next === 24) {
        minIndex = currentIndex
      }
      if (prev < 24 && next > 24) {
        minIndex = currentIndex - 1
      }
      return next
    }, 0)
    this.setState({
      showSwitch: colNum > 24 ? true : false,
      searchItemNum: search.searchItemNum || minIndex || colNum,
      minSearchItem: minIndex,
    })
    if (colNum < 24) {
      this.setState({
        leftSpan: Math.floor((colNum / 24) * 18),
        leftItemSpan: Math.floor((24 / colNum) * 6),
      })
    }
  }
  handSwitch() {
    const { searchItemNum, minSearchItem, maxSearchItem } = this.state
    this.setState({
      searchItemNum:
        searchItemNum === minSearchItem ? maxSearchItem : minSearchItem,
    })
  }
  renderSwitch() {
    const { searchItemNum, minSearchItem, maxSearchItem } = this.state
    if (searchItemNum === minSearchItem) {
      return (
        <a className={styles.switch} onClick={this.handSwitch}>
          展开
          <CaretDownOutlined />
        </a>
      );
    }
    if (searchItemNum === maxSearchItem) {
      return (
        <a className={styles.switch} onClick={this.handSwitch}>
          收起
          <CaretUpOutlined />
        </a>
      );
    }
  }
  handleChange(key, value) {
    const { onChange } = this.props
    let data = { [key]: value }
    // 输入框处理
    if (value && value.target) {
      data = {
        [key]: !_.isEmpty(value.target.value) ? value.target.value : undefined,
      }
    }
    this.setState(
      prevState => ({ search: { ...prevState.search, ...data } }),
      () => {
        onChange && onChange(data, this.state.search)
      }
    )
  }

  handleSearch(search, type) {
    const { fields = [], onSearch } = this.props
    let searchParam = transformSearch(search, fields)
    // searchParam.searchItemNum = this.state.searchItemNum
    onSearch(searchParam, type)
  }

  handleReset() {
    const initialSearch = this.initialSearch
    this.setState({ search: initialSearch }, () => {
      this.handleSearch(initialSearch, 'reset')
    })
  }

  render() {
    const {
      search,
      showSwitch,
      searchItemNum,
      leftSpan,
      leftItemSpan,
    } = this.state
    const { fields, BtnGroup = null } = this.props
    const itemLayout = item => ({
      itemCol: {
        span: item.itemCol
          ? Math.floor((item.itemCol / 6) * leftItemSpan)
          : leftItemSpan,
      },
      labelCol: {
        span: 0,
      },
      wrapperCol: {
        span: 24,
      },
    })
    // const btnsColNum = btnsCol || itemLayout.itemCol;

    return (
      <div className={styles.barContent} ref={this.searchRef}>
        <Row style={{ flexWrap: 'nowrap' }}>
          <Col flex={`${leftSpan} 0 0`}>
            <Row gutter={12}>
              {fields.map((field, index) => (
                <Col
                  {...itemLayout(field).itemCol}
                  key={`itemKey${index}`}
                  className={classNames({
                    [`${styles.colHidden}`]: index > searchItemNum,
                  })}
                >
                  <FormItem
                    style={{ marginBottom: '10px' }}
                    // label={field.name}
                    help={field.help}
                    key={field.key}
                    labelCol={itemLayout.labelCol}
                    wrapperCol={itemLayout(field).wrapperCol}
                  >
                    {createField(field, search, this.handleChange)}
                  </FormItem>
                </Col>
              ))}
            </Row>
          </Col>
          <Col style={{ ...this.props.btnCoStyle, minWidth: 250 }} flex={`${24 - leftSpan}`}>
            <div className={styles.btns} style={this.props.btnCiStyle}>
              <Button
                icon={<SearchOutlined />}
                type="primary"
                onClick={() => this.handleSearch(search)}
              >
                查询
              </Button>
              <Button icon={<RedoOutlined />} onClick={this.handleReset}>
                重置
              </Button>
              {showSwitch && this.renderSwitch()}
            </div>
          </Col>
          {/* <Col span={18 - leftSpan}>
            <div style={{ float: 'right' }}>{this.props.children}</div>
          </Col> */}
        </Row>
        {BtnGroup && BtnGroup}
      </div>
    );
  }
}
export default SearchForm
