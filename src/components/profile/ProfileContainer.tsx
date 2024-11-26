import { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Profile from './Profile'
import Loader from '../../assets/Loader'
import { withAuthRedirect } from '../../hoc/withAuthRedirect'
import { setProfile, setStatus } from '../../redux/profile-reducer'
import { IDispatch } from '../../redux/store'
import { useParams } from 'react-router-dom'
import { getId, getProfileUser } from '../../selectors'

const ProfileContainer: FC = () => {
      const params = useParams()
      const profileUserId = useSelector(getId)
      const dispatch: IDispatch = useDispatch()
      const profileUser = useSelector(getProfileUser)
      const refreshProfile = () => {
            let id = params.userId as unknown as number
            if (!id) id = profileUserId as number
            dispatch(setProfile(id))
            dispatch(setStatus(id))
      }
      useEffect(() => {
            refreshProfile()
      }, [])
      if (!profileUser) {
            return <Loader isFetching={true} />
      }
      return <Profile />
}

export default withAuthRedirect(ProfileContainer)
