import { Dispatch } from "redux"
import { ProfileActions, ProfileRequests } from "../redux/profile-reducer"
import { PhotosType } from "../types"

const createThunk = (apiRequest: ProfileRequests, actionCreator: (...args: any[]) => ProfileActions, args: string | number | PhotosType) => async (dispatch: Dispatch) => {
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
