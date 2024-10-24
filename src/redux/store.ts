import { profile_reducer } from './profile-reducer'
import { dialogs_reducer } from './dialogs-reducer'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { sidebar_reducer } from './sidebar-reducer'
import { users_reducer } from './users-reducer'
import { auth_reducer } from './auth-reducer'
import { reducer as formReducer } from 'redux-form'
import { app_reducer } from './app-reducer'

const rootReducer = combineReducers({
      profile: profile_reducer,
      dialogs: dialogs_reducer,
      sidebar: sidebar_reducer,
      users: users_reducer,
      auth: auth_reducer,
      form: formReducer,
      app: app_reducer,
})
let store = configureStore({ reducer: rootReducer })

type PropertiesType<T> = T extends { [key: string]: infer U } ? U : never
export type ActionsTypes<T extends { [key: string]: (...args: any[]) => any }> = ReturnType<PropertiesType<T>>

type rootReducerType = typeof rootReducer
export type rootStateType = ReturnType<rootReducerType>

// @ts-ignore
window.store = store

export { store }
