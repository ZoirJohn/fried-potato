import { FaExclamationCircle } from 'react-icons/fa';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';

const News = () => {
	return <h1 className='fa_exclamation'><FaExclamationCircle /><p>Closed for further development</p></h1>;
};

export default withAuthRedirect(News);