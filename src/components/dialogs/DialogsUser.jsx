import styles from '../../css/Dialogs.module.css';


const Item = (props) => {
	return <li className={styles.item}><a href="#">{props.name}</a></li>;
};

export default Item;