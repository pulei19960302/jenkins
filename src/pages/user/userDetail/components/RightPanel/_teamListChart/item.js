import styles from './item.less'
export default function({ modelIndex }) {
  return (
    <div
      className={styles.container}
      style={{ width: modelIndex === -1 ? 'inherit' : 208 }}
    >
      {modelIndex !== -1 && <Line modelIndex={modelIndex} />}
      <div className={styles.right}></div>
    </div>
  )
}
const Line = function({ modelIndex }) {
  const models = [
    [0, 0, 1, 1],
    [1, 0, 0, 1],
    [1, 0, 1, 1],
    [0, 1, 1, 1],
    [0, 1, 0, 1],
    [1, 1, 0, 1],
    [1, 1, 0, 1],
  ]
  const model = models[modelIndex]
  return (
    <div className={styles.left}>
      <div className={styles.boxLeft}></div>
      <div
        className={`${styles.boxRight} ${
          model[0] ? styles.boxRightLeftBordered : ''
        }`}
      ></div>
      <div
        className={`${styles.boxLeft} ${
          model[1] ? styles.boxLeftTopBordered : ''
        }`}
      ></div>
      <div
        className={`${styles.boxRight} ${
          model[2] ? styles.boxRightLeftBordered : ''
        } ${model[3] ? styles.boxRightTopBordered : ''}`}
      ></div>
    </div>
  )
}
