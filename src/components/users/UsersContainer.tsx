import { useSelector } from 'react-redux'
import { FC } from 'react'
import { getIsFetching } from '../../selectors'
import Users from './Users'
import Loader from '../../assets/Loader'

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
