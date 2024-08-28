const createThunk =
      (apiRequest, actionCreator, ...args) =>
      async (dispatch) => {
            try {
                  const response = await apiRequest(...args);
                  if (response.status || response.data.resultCode) {
                        dispatch(actionCreator(response.data));
                  }
            } catch (error) {
                  alert("Error has occured", error);
            }
      };

export default createThunk;
