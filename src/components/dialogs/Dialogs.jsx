import styles from '../../css/Dialogs.module.css';
import Item from './DialogsUser';
import Text from './DialogsModel';
import AddMessageRedux from './DialogsForm';


const Dialogs = (props) => {
	return (
		<section className={styles.dialogs}>
			<div className={styles.contacts}>
				<ul className={styles.names}>
					{props.contacts.map(i => <Item name={i.name} key={i.id}/>)}
				</ul>
			</div>
			<div className={styles.chats}>
				{props.texts.map((t, id) => <Text text={t.content} key={id}/>)}
			</div>
			<AddMessageRedux onSubmit={(formData) => props.addMessage(formData.AddMessageForm)}/>
		</section>
	);
};

export default Dialogs;