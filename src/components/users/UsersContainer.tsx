import { connect } from 'react-redux'
import { Component } from 'react'
import Users from './Users'
import Loader from '../../assets/Loader'
import { follow, getUsersThunk, UsersActions, unfollow } from '../../redux/users-reducer'
import { withRouter } from '../../hoc/withRouter'
import { withAuthRedirect } from '../../hoc/withAuthRedirect'
import { compose } from 'redux'
import { getCurrentPage, getFilter, getInProgress, getIsFetching, getOverall, getPageSize, getUsersListSelector } from '../../redux/users-selectors'
import { UserType } from '../../types'
import { rootStateType } from '../../redux/store'

type IState = {
      usersList: Array<UserType>
      overall: number
      pageSize: number
      currentPage: number
      isFetching: boolean
      inProgress: Array<number>
      filter: {
            term: string
            onlyFriends: boolean | null
      }
}
type IDispatch = {
      getUsersThunk: (currentPage: number, pageSize: number, term: string, searched?: boolean) => void
      setCurrentPage: (p: number) => void
      follow: (id: number) => void
      unfollow: (id: number) => void
}
type OwnPropsType = {}
type IProps = IState & IDispatch & OwnPropsType

class UsersContainer extends Component<IProps> {
      componentDidMount() {
            this.props.getUsersThunk(this.props.currentPage, this.props.pageSize, this.props.filter.term)
      }
      setCurrentPageUsers = (p: number) => {
            this.props.getUsersThunk(p, this.props.pageSize, this.props.filter.term)
      }
      setFilterSearch = (term: string) => {
            console.log(this.props.currentPage)
            this.props.getUsersThunk(1, this.props.pageSize, term, true)
      }
      render() {
            return (
                  <>
                        <Loader isFetching={this.props.isFetching} />
                        <Users
                              overall={this.props.overall}
                              pageSize={this.props.pageSize}
                              currentPage={this.props.currentPage}
                              usersList={this.props.usersList}
                              setCurrentPageUsers={this.setCurrentPageUsers}
                              follow={this.props.follow}
                              unfollow={this.props.unfollow}
                              inProgress={this.props.inProgress}
                              setFilterSearch={this.setFilterSearch}
                              filter={this.props.filter}
                        />
                  </>
            )
      }
}

const mapStateToProps = (state: rootStateType): IState => {
      return {
            usersList: getUsersListSelector(state),
            overall: getOverall(state),
            pageSize: getPageSize(state),
            currentPage: getCurrentPage(state),
            isFetching: getIsFetching(state),
            inProgress: getInProgress(state),
            filter: getFilter(state),
      }
}

export default compose<React.ComponentType>(
      connect<IState, IDispatch, OwnPropsType, rootStateType>(mapStateToProps, {
            follow,
            unfollow,
            getUsersThunk,
            setCurrentPage: UsersActions.setCurrentPage,
      }),
      withRouter,
      withAuthRedirect
)(UsersContainer)
