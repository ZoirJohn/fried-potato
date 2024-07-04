import {CgNotes} from 'react-icons/cg';
import {withAuthRedirect} from '../../hoc/withAuthRedirect';

const News = () => {
	return <h1><CgNotes/></h1>;
};

export default withAuthRedirect(News);