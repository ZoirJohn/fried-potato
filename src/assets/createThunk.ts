import { ProfileActionsTypes, ProfileRequests } from "../redux/profile-reducer"
import { PhotosType } from "../types"
import { ThunkAction } from "redux-thunk"
import { rootStateType } from "../redux/store"

const createThunk =
      (apiRequest: ProfileRequests, actionCreator: (args: any) => ProfileActionsTypes, args: string | number | PhotosType): ThunkAction<Promise<void>, rootStateType, unknown, ProfileActionsTypes> =>
      async (dispatch) => {
            try {
                  const response = await apiRequest(args)
                  if (response.status || response.data.resultCode) {
                        dispatch(actionCreator(response.data))
                  }
            } catch (error) {
                  alert(`Error has occured ${error}`)
            }
      }

export default createThunk
