import { CloseCircleFilled, PlusOutlined } from '@ant-design/icons';
import { Select, Input, InputNumber } from 'antd';
import { IconFont,InputNumberGroup } from 'components'
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
export default function({ item, index, onChange, length, type }) {
  const COLORS = type === 1 ? ['#C7E7FC', '#42A7E9'] : ['#F7DBDB', '#F05959']
  const TEXTS = type === 1 ? '分销商' : '代理商'
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
  const selectChange=(e)=>{
    onChange(
        'change',
        index,
        {
          ...item,
          relation: Number(e),
        }
      )
  }
  const intergralSelectChange=(e)=>{
    onChange(
        'change',
        index,
        {
          ...item,
          integral_way: Number(e),
        }
      )
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
            {
                index < length - 1 ? <Select
              onChange={selectChange}
              defaultValue={item.relation}
              style={{ width: '100%' }}
            >
              {getOptions()}
            </Select>:<div style={{height:32}}></div>
            }

          </div>
        </div>
      )}
      {index < length - 1 ? (
        <div className={styles.right}>
          <div className={styles.rightBallBox}>
            <div
              style={{
                backgroundColor: index === 0 ? '#FFF4B8' : COLORS[0],
                color: index === 0 ? '#D7984B' : COLORS[1],
              }}
              className={styles.rightBall}
            >
              {index === 0 ? '消费者' : `${TEXTS}${ABC[index - 1]}`}
            </div>
          </div>
          <div className={styles.inputContainer}>
            <IconFont
              className={styles.inputIcon}
              type="iconyongjin"
            ></IconFont>
            {index === 0 ? (
              '无佣金'
            ) : (
              <InputNumberGroup
                value={item.money}
                onChange={e => {
                  formChange('money', e)
                }}
                placeholder="佣金"
                addonAfter="%"
              />
            )}
          </div>
          <div className={styles.inputContainer} style={{ marginTop: 7 }}>
            <IconFont className={styles.inputIcon} type="iconjifen1"></IconFont>
            <Select
                onChange={intergralSelectChange}
                defaultValue={item.integral_way}
                style={{ width: '100%' }}
            >
                {getIntergralOptions()}
            </Select>
          </div>
          <div className={styles.inputContainer} style={{ marginTop: 7 }}>
            <IconFont style={{opacity:0}} className={styles.inputIcon} type="iconjifen1"></IconFont>
            {
                (+item.integral_way===1 || +item.integral_way===2)&&
                <InputNumberGroup
                value={item.integral}
                onChange={e => {
                  formChange('integral', e)
                }}
                placeholder="积分"
                addonAfter={+item.integral_way===1?'%':''}
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
              alt=""
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

export const getIntergralOptions = () => {
    return [
      {
        name: '消费金额',
        value: 1,
      },
      {
        name: '固定积分',
        value: 2,
      },
      {
        name: '无',
        value: 3,
      },
    ].map(it => <Option key={it.value}>{it.name}</Option>)
}
