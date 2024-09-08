import React from "react"
import styles from "../../css/PostModel.module.css"
import profilePhoto from "../../img/profile.jpg"
import { AiOutlineLike } from "react-icons/ai"

type PropsType = {
      text: string
      likeNumber: number
}

const PostModel: React.FC<PropsType> = (props) => {
      return (
            <li className={styles.item}>
                  <img src={profilePhoto} alt='' />
                  <p>{props.text}</p>
                  <div className={styles.buttons}>
                        <p>
                              <AiOutlineLike />
                              <span>{props.likeNumber}</span>
                        </p>
                  </div>
            </li>
      )
}

export default PostModel
