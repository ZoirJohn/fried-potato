import { Navigate } from 'react-router-dom'
import { connect, useSelector } from 'react-redux'
import React from 'react'
import { rootStateType } from '../redux/store'
import { getAuth } from '../selectors'
export const withAuthRedirect = <WCP,>(WrappedComponent: React.ComponentType<WCP>) => {
      const ComponentWithRedirect: React.FC = (props) => {
            const auth = useSelector(getAuth)
            if (!auth) return <Navigate to={'/login'} />

            return <WrappedComponent {...(props as any)} />
      }

      return ComponentWithRedirect
}
