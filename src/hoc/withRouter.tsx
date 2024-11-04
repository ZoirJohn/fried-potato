import { useLocation, useNavigate, useParams } from 'react-router-dom'

export function withRouter<WCP>(Component: React.ComponentType<WCP>)  {
      function ComponentWithRouterProp(props: WCP) {
            let params = useParams()
            let location = useLocation()
            let navigate = useNavigate()
            return <Component {...props} router={{ params, location, navigate }} />
      }

      return ComponentWithRouterProp
}
