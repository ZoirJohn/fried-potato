import styles from '../css/Users.module.css';
import {useState} from 'react';

const Paginator = (props) => {
	let items = Math.ceil(props.overall / props.pageSize);
	let pages = [];

	for (let i = 1; i <= items; i++) {
		pages.push(i);
	}

	const portions = Math.ceil(items / props.portionSize);
	let [portionNumber, setPortionNumber] = useState(1);
	let leftPortionPageNumber = (portionNumber - 1) * props.portionSize + 1;
	let rightPortionPageNumber = portionNumber * props.portionSize;

	return <>
		{portionNumber > 1 &&
			<button className={styles.paginatorScrollButton} id={styles.prev} onClick={() => {
				setPortionNumber(portionNumber - 1);
			}}>{'<< PREV'}</button>}


		{pages.filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber).map((b, id) => {
			return <button key={id}
						   className={`${props.currentPage === b ? styles.current : ''} ${styles.pageButton}`}
						   onClick={(e) => props.setCurrentPageUsers(b)}>{b}</button>;
		})}

		{portions > portionNumber &&
			<button className={styles.paginatorScrollButton} id={styles.next} onClick={() => {
				setPortionNumber(portionNumber + 1);
			}}>{'NEXT >>'}</button>}
	</>;
};

export default Paginator;