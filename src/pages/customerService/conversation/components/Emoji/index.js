import React, { PureComponent } from "react"
import styles from './index.less'
import emoji from './emojiConfig'

const emojiList = emoji.people

class Emoji extends PureComponent {
    state = {

    }
    handleEmoji = (emoji) => {
        this.props.selectEmoji(emoji)
    }
    render() {
        return (
            <div className={styles.Emoji}>
                <div className={styles.emojiContainer}>
                    {
                        emojiList.map((emoji,index)=><span 
                        className={styles.item} onClick={()=>this.handleEmoji(emoji)} key={index}>
                            {emoji}
                        </span>)
                    }
                </div>
                <div className={styles.triangle}></div>
            </div>
        )
    }
}

export default Emoji