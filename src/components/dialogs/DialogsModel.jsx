import styles from '../../css/Dialogs.module.css';


const Text = (props) => {
	return <p className={styles.chatTabs}>{props.text}</p>;
};

export default Text;