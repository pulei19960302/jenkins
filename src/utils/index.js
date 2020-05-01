import { cloneDeep, flow, isObject, isEmpty, isArray } from 'lodash'
import umiRouter from 'umi/router'
import { nextTick } from './nextTick'
import pathToRegexp from 'path-to-regexp'

export { Color } from './theme'

/**
 * Query objects that specify keys and values in an array where all values are objects.
 * @param   {array}         array   An array where all values are objects, like [{key:1},{key:2}].
 * @param   {string}        key     The key of the object that needs to be queried.
 * @param   {string}        value   The value of the object that needs to be queried.
 * @return  {object|undefined}   Return frist object when query success.
 */
export function queryArray(array, key, value) {
  if (!Array.isArray(array)) {
    return
  }
  return array.find(_ => _[key] === value)
}

/**
 * Convert an array to a tree-structured array.
 * @param   {array}     array     The Array need to Converted.
 * @param   {string}    id        The alias of the unique ID of the object in the array.
 * @param   {string}    parentId       The alias of the parent ID of the object in the array.
 * @param   {string}    children  The alias of children of the object in the array.
 * @return  {array}    Return a tree-structured array.
 */
export function arrayToTree(
  array,
  id = 'id',
  parentId = 'pid',
  children = 'children'
) {
  const result = []
  const hash = {}
  const data = cloneDeep(array)

  data.forEach((item, index) => {
    hash[data[index][id]] = data[index]
  })

  data.forEach(item => {
    const hashParent = hash[item[parentId]]
    if (hashParent) {
      !hashParent[children] && (hashParent[children] = [])
      hashParent[children].push(item)
    } else {
      result.push(item)
    }
  })
  return result
}

/**
 * Adjust the router to automatically add the current language prefix before the pathname in push and replace.
 */
const myRouter = { ...umiRouter }

myRouter.push = flow(umiRouter.push)

myRouter.replace = flow(myRouter.replace)

export const router = myRouter

/**
 * Whether the path matches the regexp if the language prefix is ignored, https://github.com/pillarjs/path-to-regexp.
 * @param   {string|regexp|array}     regexp     Specify a string, array of strings, or a regular expression.
 * @param   {string}                  pathname   Specify the pathname to match.
 * @return  {array|null}              Return the result of the match or null.
 */
export function pathMatchRegexp(regexp, pathname) {
  return pathToRegexp(regexp).exec(pathname)
}

/**
 * In an array object, traverse all parent IDs based on the value of an object.
 * @param   {array}     array     The Array need to Converted.
 * @param   {string}    current   Specify the value of the object that needs to be queried.
 * @param   {string}    parentId  The alias of the parent ID of the object in the array.
 * @param   {string}    id        The alias of the unique ID of the object in the array.
 * @return  {array}    Return a key array.
 */
export function queryPathKeys(array, current, parentId, id = 'id') {
  const result = [current]
  const hashMap = new Map()
  array.forEach(item => hashMap.set(item[id], item))

  const getPath = current => {
    const currentParentId = hashMap.get(current)[parentId]
    if (currentParentId) {
      result.push(currentParentId)
      getPath(currentParentId)
    }
  }

  getPath(current)
  return result
}

/**
 * In an array of objects, specify an object that traverses the objects whose parent ID matches.
 * @param   {array}     array     The Array need to Converted.
 * @param   {string}    current   Specify the object that needs to be queried.
 * @param   {string}    parentId  The alias of the parent ID of the object in the array.
 * @param   {string}    id        The alias of the unique ID of the object in the array.
 * @return  {array}    Return a key array.
 */
export function queryAncestors(array, current, parentId, id = 'id') {
  const result = [current]
  const hashMap = new Map()
  array.forEach(item => hashMap.set(item[id], item))

  const getPath = current => {
    const currentParentId = hashMap.get(current[id])[parentId]
    if (currentParentId) {
      result.push(hashMap.get(currentParentId))
      getPath(hashMap.get(currentParentId))
    }
  }

  getPath(current)
  return result
}

/**
 * 结合配置，判断当前路由应映射哪套 layout：primary 还是 public
 * @param   {layouts}     layouts   Layout configuration.
 * @param   {pathname}    pathname  Path name to be queried.
 * @return  {string}   Return frist object when query success.
 */
export function queryLayout(layouts, pathname) {
  let result = 'public'

  const isMatch = regepx => {
    return regepx instanceof RegExp
      ? regepx.test(pathname)
      : pathMatchRegexp(regepx, pathname)
  }

  for (const item of layouts) {
    let include = false
    let exclude = false
    if (item.include) {
      for (const regepx of item.include) {
        if (isMatch(regepx)) {
          include = true
          break
        }
      }
    }

    if (include && item.exclude) {
      for (const regepx of item.exclude) {
        if (isMatch(regepx)) {
          exclude = true
          break
        }
      }
    }

    if (include && !exclude) {
      result = item.name
      break
    }
  }

  return result
}


// 获取对象深层值 {a:{b:{c:22}}},a.b.c =>22;
export const getValueFromObject = (datas, keyStr) => {
  if (!keyStr) {
    return ''
  }
  const keys = keyStr.split('.')
  return keys.reduce((findDatas, key) => (findDatas || {})[key], datas || {})
}
//扩展talbe的Columns
export const createColumns = (fields, extraFields) => {
  let newFields = fields
  extraFields.forEach(item => {
    let hasField = false
    newFields = newFields.map(field => {
      if (item.key === field.key) {
        hasField = true
      }
      return item.key === field.key ? item : field
    })
    if (!hasField) {
      newFields.push(item)
    }
  })
  return newFields
}

/**
 * 数组枚举转对象
 * @param {*} array
 * @param {*} key
 * @param {*} value
 */

export const ArrayToObject = (array, key, value) => {
  return array.reduce((obj, item) => {
    obj[item[key]] = item[value]
    return obj
  }, {})
}

/**
 *  深度比较
 *  @param {*} a 对象深比较A
 *  @param {*} b 对象深比较A
 */

export function looseEqual(a, b) {
  if (a === b) return true
  const isObjectA = isObject(a)
  const isObjectB = isObject(b)
  if (isObjectA && isObjectB) {
    try {
      const isArrayA = Array.isArray(a)
      const isArrayB = Array.isArray(b)
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every((e, i) => looseEqual(e, b[i]))
      } else if (!isArrayA && !isArrayB) {
        const keysA = Object.keys(a)
        const keysB = Object.keys(b)
        return (
          keysA.length === keysB.length &&
          keysA.every(key => looseEqual(a[key], b[key]))
        )
      }
      /* istanbul ignore next */
      return false
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

// 保留两位小数，四舍五入
export const toPercent = number => Math.round(number * 100) / 100

//input 框 小数点位数截取
export const cutOutDecimals = (value, num) => {
  let reg
  switch (num) {
    case 2:
      reg = value && value.toString().match(/\d+\.?\d{0,2}/)
      break;
    case 1:
      reg = value && value.toString().match(/\d+\.?\d{0,1}/)
      break;
    default:
      reg = value && [value.toString().replace(/[^\d]/g, "")]
  }

  return reg && reg[0]
}

/* eslint-disable */
// 生成随机字符串
export function createUUID() {
  return 'xy-4yx'.replace(/[xy]/g, c => {
    const r = Math.random() * 16 || 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

// 设置斑马样式表格行
export const getTableRowClassName = (record, index) => {
  return index % 2 === 0 ? '' : 'bggray2'
}

// 判断数组是否有重复元素，只支持普通数组
export const arrHasRepeatItem = array => {
  const newArray = [...new Set(array)]
  return newArray.length < array.length
}

// 打开新窗口
export function openWindowSafe(url, useSelf = false) {
  const aele = document.createElement('a');
  const $url = useSelf ? url : `${location.origin}${location.pathname}${location.search}#${url}`;
  aele.href = $url;
  Object.assign(aele, {
    target: '_blank',
    rel: 'noopener'
  });
  aele.style.visibility = 'hidden';
  document.body.appendChild(aele);
  aele.click();
  nextTick(() => {
    aele.remove();
  });
}