import styles from '../../css/Dialogs.module.css'

type IProps = {
      name: string
}
const Item: React.FC<IProps> = (props) => {
      return (
            <li className={styles.item}>
                  <a href='#'>{props.name}</a>
            </li>
      )
}

export default Item
