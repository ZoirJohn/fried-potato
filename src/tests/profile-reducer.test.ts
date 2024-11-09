import { ProfileActions, profile_reducer } from '../redux/profile-reducer'

test('add post', () => {
      let action = ProfileActions.addPost('It is being tested')
      let state = {
            posts: [
                  { text: 'Hello', likeNumber: 12, id: 1 },
                  { text: 'How do you do?', likeNumber: 18, id: 2 },
                  { text: 'Pretty fine', likeNumber: 4, id: 3 },
            ],
            profileUser: null,
            status: undefined,
      }
      let newState = profile_reducer(state, action)
      expect(newState.posts.length).toEqual(4)
})

test('delete post', () => {
      let action = ProfileActions.deletePost(3)
      let state = {
            posts: [
                  { text: 'Hello', likeNumber: 12, id: 1 },
                  { text: 'How do you do?', likeNumber: 18, id: 2 },
                  { text: 'Pretty fine', likeNumber: 4, id: 3 },
            ],
            profileUser: null,
            status: undefined,
      }

      let newState = profile_reducer(state, action)
      expect(newState.posts.length).toEqual(2)
})
