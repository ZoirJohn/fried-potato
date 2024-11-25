import { withAuthRedirect } from '../../hoc/withAuthRedirect'
import { compose } from 'redux'
import Dialogs from './Dialogs'

export default compose<React.ComponentType>(withAuthRedirect)(Dialogs)
