import { ProfileActionsTypes } from "../redux/profile-reducer"
import { ThunkAction } from "redux-thunk"
import { rootStateType } from "../redux/store"
import { PhotosType } from "../types"
import { ResultCodeSuccessError } from "../api/api"

const createThunk =
      (request: Function, action: (params: any) => ProfileActionsTypes, args: string | number | PhotosType): ThunkAction<Promise<void>, rootStateType, unknown, ProfileActionsTypes> =>
      async (dispatch) => {
            try {
                  const response = await request(args)
                  if (response.resultCode === ResultCodeSuccessError.Success || response) {
                        dispatch(action(response.data))
                  }
            } catch (error) {
                  alert(error)
            }
      }

export default createThunk
