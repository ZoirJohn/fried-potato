import { ProfileActionsTypes } from "../redux/profile-reducer"
import { ThunkAction } from "redux-thunk"
import { rootStateType } from "../redux/store"
import { PhotosType } from "../types"

const createThunk =
      (request: Function, action: (params: any) => ProfileActionsTypes, args: string | number | PhotosType): ThunkAction<Promise<void>, rootStateType, unknown, ProfileActionsTypes> =>
      async (dispatch) => {
            console.log(typeof request)
            try {
                  const response = await request(args)
                  if (response) {
                        dispatch(action(response.data))
                  }
            } catch (error) {
                  alert(error)
            }
      }

export default createThunk
