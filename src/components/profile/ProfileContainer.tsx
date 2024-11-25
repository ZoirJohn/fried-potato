import React, { Component, FC, useEffect } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import Profile from './Profile'
import Loader from '../../assets/Loader'
import { withAuthRedirect } from '../../hoc/withAuthRedirect'
import { compose } from 'redux'
import { ProfileActions, setProfile, setStatus, updateStatus } from '../../redux/profile-reducer'
import { withRouter } from '../../hoc/withRouter'
import { MessageType, ProfileType } from '../../types'
import { IDispatch, rootStateType } from '../../redux/store'
import { useParams } from 'react-router-dom'
import { getId, getProfileUser } from '../../selectors'

type IState = {
      posts: Array<MessageType>
      profileUser: ProfileType | null
      status: string | undefined
      id: number
}
// type IDispatch = {
//       addPost: (formData: string) => void
//       updateStatus: (text: string, id: number) => void
//       setProfile: (id: number) => void
//       setStatus: (id: number) => void
// }

type IRouter = {
      params: {
            userId: number
      }
      location: string
      navigate: string
}

type OwnPropsType = {
      router: IRouter
}
type IProps = IState & OwnPropsType

const ProfileContainer: FC = () => {
      const params = useParams()
      const profileUserId = useSelector(getId)
      const dispatch: IDispatch = useDispatch()
      const profileUser=useSelector(getProfileUser)
      const refreshProfile = () => {
            let id = params.userId as unknown as number
            if (!id) id = profileUserId as number
            dispatch(setProfile(id))
            dispatch(setStatus(id))
      }
      useEffect(() => {
            refreshProfile()
      }, [])

      // shouldComponentUpdate(nextProps: IProps) {
      //       return nextProps.status === this.props.status
      // }
      // componentDidUpdate(prevProps: IProps) {
      //       if (this.props.router.params.userId != prevProps.router.params.userId) {
      //             this.refreshProfile()
      //       }
      // }
      if (!profileUser) {
            return <Loader isFetching={true} />
      }
      return <Profile />
}

export default compose<React.ComponentType>(withAuthRedirect)(ProfileContainer)
