import { setUserData } from "./auth-reducer";

const INIT_SUCCESS = "app/INIT-SUCCESS";

let initialState = {
      initialized: false as boolean | null,
};

export type InitialStateAppType = typeof initialState;

const app_reducer = (_state = initialState, action: any) => {
      switch (action.type) {
            case INIT_SUCCESS:
                  return {
                        ..._state,
                        initialized: true,
                  };
            default:
                  return { ..._state };
      }
};
type setInitializedType = {
      type: typeof INIT_SUCCESS;
};
const setInitialized = (): setInitializedType => ({ type: INIT_SUCCESS });

const initializeApp = () => (dispatch: Function) => {
      console.log("Promise");
      const promise = dispatch(setUserData());
      Promise.all([promise]).then(() => {
            dispatch(setInitialized());
      });
};

export { app_reducer, initializeApp };
