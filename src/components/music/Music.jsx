import {withAuthRedirect} from '../../hoc/withAuthRedirect';
import { FaExclamationCircle } from 'react-icons/fa';

const Music = () => {
	return <h1 className='fa_exclamation'><FaExclamationCircle /><p>Closed for further development</p></h1>;
};

export default withAuthRedirect(Music);
