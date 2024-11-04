import { Navigate } from 'react-router-dom'
import { connect } from 'react-redux'
import React from 'react'
import { rootStateType } from '../redux/store'

const mapStateToPropsWithAuth = (state: rootStateType) => {
      return {
            auth: state.auth.isAuthorized,
      }
}

export function withAuthRedirect<WCP>(WrappedComponent: React.ComponentType<WCP>) {
      const ComponentWithRedirect = (props: { auth: boolean | null }) => {
            if (!props.auth) return <Navigate to={'/login'} />

            return <WrappedComponent {...(props as any)} />
      }

      return connect(mapStateToPropsWithAuth)(ComponentWithRedirect)
}
