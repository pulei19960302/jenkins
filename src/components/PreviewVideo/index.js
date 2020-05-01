import ReactDOM from 'react-dom'
import styles from './index.less'
import { CloseCircleOutlined } from '@ant-design/icons';

const VideoModal = function ({ src, autoPlay = true, close }) {
    const handleClose = () => {
        close && close()
    }
    return (
        <div className={styles.videoModal}>
            <div className="videoContainer">
                <CloseCircleOutlined className="close" onClick={handleClose} />
                <video src={src} controls muted autoPlay={autoPlay}></video>
            </div>
        </div>
    );
}


const PreviewVideo = ({ videoSrc, onCancel }) => {
    const modalWrap = document.createElement('div')
    document.body.appendChild(modalWrap)

    function close(...args) {
        const unmountResult = ReactDOM.unmountComponentAtNode(modalWrap)
        if (unmountResult && modalWrap.parentNode) {
            modalWrap.parentNode.removeChild(modalWrap)
        }
        onCancel && onCancel(...args)
    }

    ReactDOM.render(<VideoModal close={() => close()} src={videoSrc} />, modalWrap)
    return {
        destroy: close,
    }
}

export default PreviewVideo