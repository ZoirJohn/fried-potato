import {CgServerless} from 'react-icons/cg';
import {withAuthRedirect} from '../../hoc/withAuthRedirect';

const Settings = () => {
	return <h1><CgServerless/></h1>;
};

export default withAuthRedirect(Settings);