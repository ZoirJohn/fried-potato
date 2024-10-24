import { ThunkAction } from "redux-thunk"
import { rootStateType } from "../redux/store"
import { PhotosType } from "../types"
import { ResultCodeSuccessError } from "../api/api"

const createThunk =
      (request: Function, action: (params: any) => any, args: string | number | PhotosType): ThunkAction<Promise<void>, rootStateType, unknown, any> =>
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
