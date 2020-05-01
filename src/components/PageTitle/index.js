import { getCurrentRoute, judgeSameRoute } from 'utils/permission'
import classnames from 'classnames'
import routeConfig from '@/layouts/routeConfig'
import styles from './index.less'
import { MutipulBtns } from 'components'
export default function({ title, children, btns, className }) {
  return (
    <div className={classnames(styles.pageTitle, className)}>
      <div className="fs18" style={{ color: '#000' }}>
        {title || getSameRoute()}
      </div>
      <div>{btns ? <MutipulBtns btns={btns} showNum={1} arrowDirection="down"></MutipulBtns> : children}</div>
    </div>
  )
}
const getSameRoute = () => {
  const curr = getCurrentRoute()
  for (let i = 0; i < routeConfig.length; i++) {
    if (judgeSameRoute(routeConfig[i].route, curr)) {
      return routeConfig[i].name
    }
  }
  return ''
}
