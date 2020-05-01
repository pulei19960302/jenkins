import { CloseCircleFilled, PlusOutlined } from '@ant-design/icons';
import { Select, Input, InputNumber } from 'antd';
import { IconFont, InputNumberGroup } from 'components'
import arrowImg from 'assets/images/arrow.png'
import headImg from 'assets/images/head.png'
import styles from './distributionBlock.less'
const Option = Select.Option

const ABC = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
]

// eslint-disable-next-line valid-jsdoc
/**
 * @param {*}
 * type:1 分销 2 代理
 */


export const getOptions = () => {
  return [
    {
      name: '直接&间接',
      value: 1,
    },
    {
      name: '直接推荐',
      value: 2,
    },
  ].map(it => <Option key={it.value}>{it.name}</Option>)
}

const intergralOptions = [
  {
    name: '消费金额',
    value: 1,
    rules: {
      min: 0,
      max: 100
    }
  }, {
    name: '固定积分',
    value: 2,
    rules: {
      min: 0,
    }
  }, {
    name: '无',
    value: 3,
  }
]

export const getIntergralOptions = () => {
  return intergralOptions.map(it => <Option key={it.value} value={it.value}>{it.name}</Option>)
}

export default function ({ item, index, onChange, length, type }) {
  const COLORS = type === 1 ? ['#C7E7FC', '#42A7E9'] : ['#F7DBDB', '#F05959']
  const TEXTS = '用户'

  const add = () => {
    onChange('add', null, null)
  }
  const del = () => {
    onChange('del', index, null)
  }
  const formChange = (key, value) => {
    onChange(
      'change',
      index,
      {
        ...item,
        [key]: value,
      }
    )
  }
  const selectChange = (e) => {
    onChange(
      'change',
      index,
      {
        ...item,
        relation: Number(e),
      }
    )
  }
  const intergralSelectChange = (e) => {
    onChange('change', index, {
      ...item,
      integral_way: Number(e),
    })
  }
  return (
    <div className={`${styles.container} animated fadeInLeft`}>


      {index !== 0 && (
        <div className={styles.left}>

          <div style={{ width: '100%' }}>
            <img
              src={arrowImg}
              width={127}
              style={{ marginBottom: 16 }}
              alt=""
            />

            <div style={{ height: 32, textAlign: 'center' }}>推荐人</div>
          </div>
        </div>
      )
      }

      {index < length - 1 ? (

        <div className={styles.right}>

          <div className={styles.rightBallBox}>
            <div
              className={styles.rightBall}
              style={{
                backgroundColor: index === 0 ? '#FFF4B8' : COLORS[0],
                color: index === 0 ? '#D7984B' : COLORS[1],
              }}>

              {index === 0 ? '消费者' : `${TEXTS}${ABC[index - 1]}`}
            </div>
          </div>

          <div className={styles.inputContainer} style={{ marginTop: 7 }}>
            <IconFont className={styles.inputIcon} type="iconjifen1"></IconFont>

            <Select
              onChange={intergralSelectChange}
              defaultValue={item.integral_way}
              style={{ width: '100%' }}
              placeholder='请选择'
            >
              {getIntergralOptions()}
            </Select>
          </div>

          <div className={styles.inputContainer} style={{ marginTop: 7 }}>
            <IconFont style={{ opacity: 0 }} className={styles.inputIcon} type="iconjifen1"></IconFont>

            {
              (+item.integral_way === 1 || +item.integral_way === 2) &&
              <InputNumberGroup
                value={item.integral}
                onChange={e => {
                  formChange('integral', e)
                }}
                precision={0}
                min={0}
                {...(item.integral_way === 1 ? { max: 100 } : null)}
                placeholder="积分"
                addonAfter={+item.integral_way === 1 ? '%' : ''}
              />
            }

          </div>
          {index > 1 && (
            <CloseCircleFilled onClick={del} className={styles.closeIcon} />
          )}
        </div>

      ) : (
          <div onClick={add} className={`${styles.right} ${styles.rightAdd}`}>
            <div className={styles.rightAddContainer}>
              <img
                width={70}
                src={headImg}
                style={{ marginBottom: 20 }}
              />
              <div className={styles.rightAddDesc}>
                <PlusOutlined></PlusOutlined>
                <span className="ml8">{`新增${TEXTS}`}</span>
              </div>
            </div>
          </div>
        )}
    </div>
  );
}
