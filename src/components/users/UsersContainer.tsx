import { connect } from "react-redux"
import { Component } from "react"
import Users from "./Users"
import Loader from "../../assets/Loader"
import { follow, getUsersThunk, setCurrentPage, unfollow } from "../../redux/users-reducer"
import { withRouter } from "../../hoc/withRouter"
import { withAuthRedirect } from "../../hoc/withAuthRedirect"
import { compose } from "redux"
import { getCurrentPage, getInProgress, getIsFetching, getOverall, getPageSize, getUsersListSelector } from "../../redux/users-selectors"
import { UserType } from "../../types"
import { rootStateType } from "../../redux/store"

type PropsType = {
      currentPage: number
      pageSize: number
      overall: number
      isFetching: boolean
      inProgress: Array<number>
      usersList: Array<UserType>
      getUsersThunk: (currentPage: number, pageSize: number) => void
      setCurrentPage: (number: number) => void
      follow: (id: number) => void
      unfollow: (id: number) => void
      setInProgress: (p: number) => void
}

class UsersContainer extends Component<PropsType> {
      componentDidMount() {
            this.props.getUsersThunk(this.props.currentPage, this.props.pageSize)
      }

      setCurrentPageUsers = (p: number) => {
            this.props.setCurrentPage(p)
            this.props.getUsersThunk(this.props.currentPage, this.props.pageSize)
      }

      render() {
            return (
                  <>
                        <Loader isFetching={this.props.isFetching} />
                        <Users overall={this.props.overall} pageSize={this.props.pageSize} currentPage={this.props.currentPage} usersList={this.props.usersList} setCurrentPageUsers={this.setCurrentPageUsers} follow={this.props.follow} unfollow={this.props.unfollow} setInProgress={this.props.setInProgress} inProgress={this.props.inProgress} />
                  </>
            )
      }
}

const mapStateToProps = (state: rootStateType) => {
      return {
            usersList: getUsersListSelector(state),
            overall: getOverall(state),
            pageSize: getPageSize(state),
            currentPage: getCurrentPage(state),
            isFetching: getIsFetching(state),
            inProgress: getInProgress(state),
      }
}

export default compose(
      connect(mapStateToProps, {
            follow,
            unfollow,
            setCurrentPage,
            getUsersThunk,
      }),
      withRouter,
      withAuthRedirect
)(UsersContainer)
