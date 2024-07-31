import styles from '../css/Profile.module.css';
import React from 'react';

const Input = ({ meta, input, ...props }) => {
	const { error, touched } = meta;
	return <div className={styles.inputTextBox}>
		<input type="text" placeholder={props.placeholder} className={props.className} {...input} />
		{touched && error && <span className={styles.error}>{error}</span>}
	</div>;
};
const InputCheckbox = ({ meta, input, ...props }) => {
	const { error, touched } = meta;
	return <div className={styles.inputTextBox}>
		<input type="checkbox" placeholder={props.placeholder} className={props.className} {...input} />
		{touched && error && <span className={styles.error}>{error}</span>}
	</div>;
};

export { Input, InputCheckbox };