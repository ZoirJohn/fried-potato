import { profile_reducer } from "./src/redux/profile-reducer";
import { dialogs_reducer } from "./src/redux/dialogs-reducer";

const store = {
      _state: {
            profile: {
                  posts: [
                        { text: "Hello", likeNumber: 12 },
                        { text: "How do you do?", likeNumber: 18 },
                        { text: "Pretty fine", likeNumber: 4 },
                  ],
                  newPost: "",
            },
            dialogs: {
                  contacts: [
                        { name: "Stephen", id: 1 },
                        { name: "Draymond", id: 2 },
                        { name: "Jonathan", id: 3 },
                        { name: "Klay", id: 4 },
                  ],
                  texts: [
                        { content: "Good morning", id: 1 },
                        { content: "How do you feel?", id: 2 },
                        { content: "Will you play PS5 with me?", id: 3 },
                  ],
                  newPost: "",
            },
            sidebar: "",
      },
      _AppTree() {
            console.log("State was changed");
      },

      subscribe(observer) {
            this._AppTree = observer;
      },
      getState() {
            return this._state;
      },

      dispatch(action) {
            this._state.profile = profile_reducer(this._state.profile, action);
            this._state.dialogs = dialogs_reducer(this._state.dialogs, action);
            this._AppTree(this._state);
      },
};

// export {store};
