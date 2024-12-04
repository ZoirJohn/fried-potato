import { Route, Routes } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import { useState } from 'react'
import styles from '../css/Main.module.css'
import ProfileContainer from './profile/ProfileContainer'
import Login from './login/Login'
import { lazy, Suspense } from 'react'

const Dialogs = lazy(() => import('./dialogs/DialogsContainer'))
const News = lazy(() => import('./news/News'))
const Music = lazy(() => import('./music/Music'))
const Settings = lazy(() => import('./settings/Settings'))
const Users = lazy(() => import('./users/UsersContainer'))

const Main = () => {
      return (
            <main className={styles.main}>
                  <Suspense fallback={<p>Loading...</p>}>
                        <Routes>
                              <Route index path={'*'} element={<Navigate to='/profile' replace />} />
                              <Route path={'/profile/:userId'} element={<ProfileContainer />} />
                              <Route path='/dialogs' element={<Dialogs />} />
                              <Route path='/news' element={<News />} />
                              <Route path='/music' element={<Music />} />
                              <Route path='/settings' element={<Settings />} />
                              <Route path='/users' element={<Users />} />
                              {/* No render is here */}
                              <Route path='/login' element={<Login />} />
                        </Routes>
                  </Suspense>
            </main>
      )
}
export default Main
