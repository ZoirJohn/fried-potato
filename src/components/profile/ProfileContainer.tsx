import React, { Component } from 'react'
import { connect } from 'react-redux'
import Profile from './Profile'
import Loader from '../../assets/Loader'
import { withAuthRedirect } from '../../hoc/withAuthRedirect'
import { compose } from 'redux'
import { ProfileActions, setProfile, setStatus, updateStatus } from '../../redux/profile-reducer'
import { withRouter } from '../../hoc/withRouter'
import { MessageType, ProfileType } from '../../types'
import { rootStateType } from '../../redux/store'

type MapStateToProps = {
      posts: Array<MessageType>
      profileUser: ProfileType|null
      status: string|undefined
      id: number
}
type MapDispatchToProps = {
      addPost: (formData: string) => void
      updateStatus: (text: string, id: number) => void
      setProfile: (id: number) => void
      setStatus: (id: number) => void
}

type RouterType = {
      params: {
            userId: number
      }
      location: string
      navigate: string
}

type OwnPropsType = {
      router: RouterType
}
type PropsType = MapStateToProps & OwnPropsType & MapDispatchToProps

class ProfileContainer extends Component<PropsType> {
      refreshProfile() {
            let id = this.props.router.params.userId
            if (!id) id = this.props.id
            this.props.setProfile(id)
            this.props.setStatus(id)
      }
      componentDidMount() {
            this.refreshProfile()
      }
      shouldComponentUpdate(nextProps: PropsType) {
            return nextProps.status === this.props.status
      }
      componentDidUpdate(prevProps: PropsType) {
            if (this.props.router.params.userId != prevProps.router.params.userId) {
                  this.refreshProfile()
            }
      }
      render() {
            if (!this.props.profileUser) {
                  return <Loader isFetching={true} />
            }
            return <Profile {...this.props} />
      }
}
const mapStateToProps = (state: rootStateType): MapStateToProps => {
      return {
            posts: state.profile.posts,
            profileUser: state.profile.profileUser,
            status: state.profile.status,
            id: state.auth.id as number,
      }
}

export default compose<React.ComponentType>(connect<MapStateToProps, MapDispatchToProps, OwnPropsType, rootStateType>(mapStateToProps, { addPost: ProfileActions.addPost, setProfile, setStatus, updateStatus }), withRouter, withAuthRedirect)(ProfileContainer)
