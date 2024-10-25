import { DialogsActions } from '../../redux/dialogs-reducer'
import { withRouter } from '../../hoc/withRouter'
import { withAuthRedirect } from '../../hoc/withAuthRedirect'
import { compose } from 'redux'
import Dialogs from './Dialogs'
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
	return {
		texts: state.dialogs.texts,
		contacts: state.dialogs.contacts,
		auth: state.auth.isAuthorized,
	}
}

export default compose(connect(mapStateToProps, { addMessage: (string) => DialogsActions.addMessage(string) }), withRouter, withAuthRedirect)(Dialogs)