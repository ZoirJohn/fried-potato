import { useSelector } from 'react-redux'
import { FC } from 'react'
import Users from './Users'
import Loader from '../../assets/Loader'
import { getIsFetching } from '../../redux/users-selectors'

type IProps = {}

const UsersContainer: FC<IProps> = () => {
      const isFetching = useSelector(getIsFetching)
      return (
            <>
                  <Loader isFetching={isFetching} />
                  <Users />
            </>
      )
}

export default UsersContainer
