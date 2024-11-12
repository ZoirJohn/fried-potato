import { DialogsActions } from '../../redux/dialogs-reducer'
import { withRouter } from '../../hoc/withRouter'
import { withAuthRedirect } from '../../hoc/withAuthRedirect'
import { compose } from 'redux'
import Dialogs from './Dialogs'
import { connect } from 'react-redux'
import { rootStateType } from '../../redux/store'
import { MessageType, Chat } from '../../types'

type IState = {
      texts: Array<MessageType>
      contacts: Array<Chat>
      auth: boolean | null
}

const mapStateToProps = (state: rootStateType): IState => {
      return {
            texts: state.dialogs.texts,
            contacts: state.dialogs.contacts,
            auth: state.auth.isAuthorized,
      }
}

export default compose<React.ComponentType>(connect<IState, {}, unknown, rootStateType>(mapStateToProps, { addMessage: (message: string) => DialogsActions.addMessage(message) }), withRouter, withAuthRedirect)(Dialogs)
