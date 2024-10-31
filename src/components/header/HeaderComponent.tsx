import { Component } from 'react'
import { connect } from 'react-redux'
import { deleteAuthData, setUserData } from '../../redux/auth-reducer'
import Header from './Header'
import { rootStateType } from '../../redux/store'

class HeaderComponent extends Component<{ auth: boolean | null; deleteAuthData: () => void }> {
      render() {
            return <Header {...this.props} />
      }
}

const mapStateToProps = (state: rootStateType) => {
      return {
            auth: state.auth.isAuthorized,
      }
}
export default connect(mapStateToProps, { deleteAuthData })(HeaderComponent)
