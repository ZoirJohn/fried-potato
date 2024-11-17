import { ResultCodeSuccessError } from '../api/api'
import { usersAPI } from '../api/users-api'
import { follow } from '../redux/users-reducer'
import { UsersActions } from '../redux/users-reducer'

jest.mock('../api/users-api')
const mockAPI = usersAPI as jest.Mocked<typeof usersAPI>
const response = { messages: ['Success has happened'], resultCode: ResultCodeSuccessError.Success, data: {} }

test('follow thunk', async () => {
      mockAPI.FOLLOW.mockReturnValue(Promise.resolve(response))

      const thunk = follow(1)

      const dispatch = jest.fn()
      const getState = jest.fn()

      await thunk(dispatch, getState, {})
      expect(dispatch).toHaveBeenCalledTimes(3)
      expect(dispatch).toHaveBeenCalledWith(UsersActions.setInProgress(true, 1))
      expect(dispatch).toHaveBeenCalledWith(UsersActions.setInProgress(false, 1))

})
