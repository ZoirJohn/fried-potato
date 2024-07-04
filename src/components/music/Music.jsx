import {CgMusicNote} from 'react-icons/cg';
import {withAuthRedirect} from '../../hoc/withAuthRedirect';

const Music = () => {
	return <h1><CgMusicNote/></h1>;
};

export default withAuthRedirect(Music);
