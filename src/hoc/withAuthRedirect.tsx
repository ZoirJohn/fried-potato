import { Navigate } from 'react-router-dom'
import { connect } from 'react-redux'
import React from 'react'
import { rootStateType } from '../redux/store'

const mapStateToPropsWithAuth = (state: rootStateType) => ({
      auth: state.auth.isAuthorized,
})
type IAuth = {
      auth: boolean | null
}
export const withAuthRedirect = <WCP,>(WrappedComponent: React.ComponentType<WCP>) => {
      const ComponentWithRedirect: React.FC<IAuth> = (props) => {
            if (!props.auth) return <Navigate to={'/login'} />

            return <WrappedComponent {...(props as any)} />
      }

      return connect(mapStateToPropsWithAuth)(ComponentWithRedirect)
}
