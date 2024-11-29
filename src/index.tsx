import ReactDOM from 'react-dom/client'
import './css/style.css'
import { HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import App from './App'
import { QueryParamProvider } from 'use-query-params'
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6'
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
      <HashRouter
            future={{
                  v7_relativeSplatPath: true,
                  v7_startTransition: true,
            }}
      >
            <QueryParamProvider adapter={ReactRouter6Adapter}>
                  <Provider store={store}>
                        <App />
                  </Provider>
            </QueryParamProvider>
      </HashRouter>
)
